import v86pkg from "v86";
const V86 = (v86pkg as any).V86 || v86pkg;
import path from "path";
import { singleton } from "tsyringe";

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
  private emulator: any;
  private isReady = false;
  private isInjecting = false;
  private responseQueue: ((val: string) => void)[] = [];
  private currentResponse = "";

  constructor() {
    this.startEmulator();
  }

  private async startEmulator() {
    const imagesPath = path.join(process.cwd(), "v86-images");
    const wasmPath = path.join(process.cwd(), "node_modules/v86/build/v86.wasm");

    console.log("[V86] Starting emulator...");
    this.emulator = new V86({
      bios: { url: path.join(imagesPath, "seabios.bin") },
      bzimage: { url: path.join(imagesPath, "bzImage") },
      wasm_path: wasmPath,
      cmdline: "console=ttyS0 tsc=reliable mitigations=off random.trust_cpu=on",
      autostart: true,
      memory_size: 128 * 1024 * 1024,
      uart1: true,
    });

    let bootOutput = "";
    this.emulator.bus.register("serial0-output-byte", (byte: number) => {
        const char = String.fromCharCode(byte);
        bootOutput += char;
        if (bootOutput.endsWith("~% ") && !this.isReady && !this.isInjecting) {
            this.isInjecting = true;
            console.log("[V86] VM Booted, injecting Lua queue...");
            this.injectLuaQueue();
        }
    });

    this.emulator.bus.register("serial1-output-byte", (byte: number) => {
        const char = String.fromCharCode(byte);
        if (char === "\r") return;
        if (char === "\n") {
            const response = this.currentResponse.trim();
            console.log("[V86] Serial1 line received:", response);
            this.currentResponse = "";
            const resolve = this.responseQueue.shift();
            if (resolve) resolve(response);
        } else {
            this.currentResponse += char;
        }
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
        this.emulator.serial0_send(cmd + "\n");
        await new Promise(r => setTimeout(r, 500));
    }
    
    this.isReady = true;
    console.log("[V86] Lua queue running.");
  }

  public async push(event: string): Promise<boolean> {
    if (!this.isReady) {
      console.log("[V86] Push failed: VM not ready");
      return false;
    }
    for (let i = 0; i < 3; i++) {
        console.log(`[V86] Sending PUSH to queue (attempt ${i + 1}):`, event);
        const res = await this.sendToQueue(`PUSH ${event}`);
        console.log(`[V86] Push response (attempt ${i + 1}):`, res);
        if (res === "OK") return true;
        await new Promise(r => setTimeout(r, 1000));
    }
    return false;
  }

  public async pop(): Promise<string | null> {
    if (!this.isReady) return null;
    for (let i = 0; i < 3; i++) {
        console.log(`[V86] Sending POP to queue (attempt ${i + 1})`);
        const res = await this.sendToQueue("POP");
        console.log(`[V86] Pop response (attempt ${i + 1}):`, res);
        if (res === "TIMEOUT") {
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
        if (res !== "TIMEOUT") {
            return parseInt(res, 10) || 0;
        }
        await new Promise(r => setTimeout(r, 1000));
    }
    return 0;
  }

  private sendToQueue(cmd: string): Promise<string> {
    return new Promise((resolve) => {
      let resolved = false;

      const timeout = setTimeout(() => {
          if (resolved) return;
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

      const bytes = Buffer.from("\n" + cmd + "\n");
      this.emulator.serial_send_bytes(1, bytes);
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
