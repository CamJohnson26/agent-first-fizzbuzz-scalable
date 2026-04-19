import V86 from "v86";
import path from "path";
import fs from "fs";
import { singleton, inject } from "tsyringe";
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { Logger } from './logger.js';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const LUA_QUEUE_SCRIPT = `
local queue = {}
local serial0 = io.open("/dev/ttyS0", "w")
local serial1 = io.open("/dev/ttyS1", "r+")
serial0:write("LUA QUEUE STARTING\n")
serial0:flush()
while true do
  local line = serial1:read("*l")
  if line then
    serial0:write("LUA RECEIVED: " .. line .. "\n")
    serial0:flush()
    if line:sub(1,4) == "PUSH" then
      table.insert(queue, line:sub(6))
      serial1:write("OK\n")
      serial1:flush()
    elseif line == "POP" then
      if #queue > 0 then
        serial1:write(table.remove(queue, 1) .. "\n")
      else
        serial1:write("EMPTY\n")
      end
      serial1:flush()
    elseif line == "COUNT" then
      serial1:write(#queue .. "\n")
      serial1:flush()
    end
  end
end
`;

@singleton()
export class V86Service {
  private emulator: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  private isReady = false;
  private isInjecting = false;
  private responseQueue: ((val: string) => void)[] = [];
  private currentResponse = "";

  constructor(
    @inject(Logger) private logger: Logger
  ) {
    this.startEmulator();
  }

  private async startEmulator() {
    const imagesPath = path.resolve(__dirname, "../v86-images");
    let wasmPath: string;
    try {
        wasmPath = require.resolve("v86/build/v86.wasm");
    } catch (_e) {
        this.logger.warn("[V86] Failed to resolve v86.wasm via require.resolve, falling back to relative path from __dirname");
        wasmPath = path.resolve(__dirname, "../node_modules/v86/build/v86.wasm");
    }

    const biosPath = path.join(imagesPath, "seabios.bin");
    const kernelPath = path.join(imagesPath, "bzImage");

    this.logger.log("[V86] Emulator configuration:", {
        wasmPath,
        biosPath,
        kernelPath,
        existsWasm: fs.existsSync(wasmPath),
        existsBios: fs.existsSync(biosPath),
        existsKernel: fs.existsSync(kernelPath),
        cwd: process.cwd(),
        dirname: __dirname,
    });

    try {
        this.logger.log("[V86] Initializing V86...");
        this.emulator = new V86({
            bios: { url: biosPath },
            bzimage: { url: kernelPath },
            wasm_path: wasmPath,
            cmdline: "console=ttyS0 tsc=reliable mitigations=off random.trust_cpu=on",
            autostart: true,
            memory_size: 128 * 1024 * 1024,
            uart1: true,
        });
        this.logger.log("[V86] Emulator instance created.");
    } catch (error) {
        this.logger.error("[V86] CRITICAL ERROR: Failed to create emulator instance:", error);
        return;
    }

    let bootOutput = "";
    this.emulator.bus.register("serial0-output-byte", (byte: number) => {
        const char = String.fromCharCode(byte);
        bootOutput += char;
        if (bootOutput.endsWith("~% ") && !this.isReady && !this.isInjecting) {
            this.isInjecting = true;
            this.logger.log("[V86] VM Booted (detected prompt), injecting Lua queue...");
            this.injectLuaQueue();
        }
    });

    this.emulator.bus.register("serial1-output-byte", (byte: number) => {
        const char = String.fromCharCode(byte);
        if (char === "\r") return;
        if (char === "\n") {
            const response = this.currentResponse.trim();
            this.logger.log("[V86] Serial1 line received:", { response });
            this.currentResponse = "";
            const resolve = this.responseQueue.shift();
            if (resolve) resolve(response);
        } else {
            this.currentResponse += char;
        }
    });

    this.emulator.bus.register("cpu-event-halt", () => {
        this.logger.error("[V86] CPU HALTED");
    });
  }

  private async injectLuaQueue() {
    const encoded = Buffer.from(LUA_QUEUE_SCRIPT).toString("base64");
    const cmds = [
        "stty -F /dev/ttyS1 -echo -onlcr",
        "fuser -k /dev/ttyS1 || true",
        `echo "${encoded}" | base64 -d > /tmp/queue.lua`,
        "lua /tmp/queue.lua &"
    ];
    
    for (const cmd of cmds) {
        this.logger.log(`[V86] Injecting command: ${cmd}`);
        this.emulator.serial0_send(cmd + "\n");
        await new Promise(r => setTimeout(r, 500));
    }
    
    this.isReady = true;
    this.logger.log("[V86] Lua queue running.");
  }

  public async push(event: string): Promise<boolean> {
    if (!this.isReady) {
      this.logger.log("[V86] Push failed: VM not ready");
      return false;
    }
    for (let i = 0; i < 3; i++) {
        this.logger.log(`[V86] Sending PUSH to queue (attempt ${i + 1}):`, { event });
        const res = await this.sendToQueue(`PUSH ${event}`);
        this.logger.log(`[V86] Push response (attempt ${i + 1}):`, { res });
        if (res === "OK") return true;
        if (res === "TIMEOUT" || res === "ERROR") {
            this.logger.warn(`[V86] Push attempt ${i + 1} failed with ${res}`);
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    return false;
  }

  public async pop(): Promise<string | null> {
    if (!this.isReady) return null;
    for (let i = 0; i < 3; i++) {
        this.logger.log(`[V86] Sending POP to queue (attempt ${i + 1})`);
        const res = await this.sendToQueue("POP");
        this.logger.log(`[V86] Pop response (attempt ${i + 1}):`, { res });
        if (res === "TIMEOUT" || res === "ERROR") {
            this.logger.warn(`[V86] Pop attempt ${i + 1} failed with ${res}`);
            await new Promise(r => setTimeout(r, 1000));
            continue;
        }
        return res === "EMPTY" ? null : res;
    }
    return null;
  }

  public async getCount(): Promise<number> {
    if (!this.isReady) return 0;
    for (let i = 0; i < 3; i++) {
        const res = await this.sendToQueue("COUNT");
        if (res !== "TIMEOUT" && res !== "ERROR") {
            return parseInt(res, 10) || 0;
        }
        this.logger.warn(`[V86] Count attempt ${i + 1} failed with ${res}`);
        await new Promise(r => setTimeout(r, 1000));
    }
    return 0;
  }

  private sendToQueue(cmd: string): Promise<string> {
    return new Promise((resolve) => {
      let resolved = false;

      const timeout = setTimeout(() => {
          if (resolved) return;
          this.logger.warn(`[V86] Queue command timeout after 5s: ${cmd}`);
          resolved = true;
          const index = this.responseQueue.indexOf(resolver);
          if (index > -1) this.responseQueue.splice(index, 1);
          resolve("TIMEOUT");
      }, 5000);

      const resolver = (val: string) => {
          if (resolved) return;
          resolved = true;
          clearTimeout(timeout);
          resolve(val);
      };
      this.responseQueue.push(resolver);

      try {
          const bytes = Buffer.from("\n" + cmd + "\n");
          this.emulator.serial_send_bytes(1, bytes);
      } catch (error) {
          this.logger.error(`[V86] Failed to send bytes to serial1: ${error}`);
          if (!resolved) {
              resolved = true;
              clearTimeout(timeout);
              const index = this.responseQueue.indexOf(resolver);
              if (index > -1) this.responseQueue.splice(index, 1);
              resolve("ERROR");
          }
      }
    });
  }

  public stop() {
    if (this.emulator) {
      this.emulator.stop();
    }
  }

  public isVMReady(): boolean {
      return this.isReady;
  }
}
