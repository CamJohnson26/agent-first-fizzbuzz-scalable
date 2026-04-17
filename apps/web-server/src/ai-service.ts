import * as ort from 'onnxruntime-web';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { injectable, singleton } from 'tsyringe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface TokenizerMapping {
  chars: string[];
  stoi: Record<string, number>;
  itos: Record<string, string>;
}

@singleton()
@injectable()
export class AIInferenceService {
  private session: ort.InferenceSession | null = null;
  private tokenizer: TokenizerMapping | null = null;
  private readonly modelPath = path.join(process.cwd(), 'data/fizzbuzz_model.onnx');
  private readonly tokenizerPath = path.join(process.cwd(), 'data/tokenizer_mapping.json');
  private readonly blockSize = 256;

  private async init() {
    if (this.session && this.tokenizer) return;

    try {
      console.log(`[AI Service] Initializing with model at: ${this.modelPath}`);
      console.log(`[AI Service] Current working directory: ${process.cwd()}`);
      console.log(`[AI Service] __dirname: ${__dirname}`);
      
      // Configure WASM paths for onnxruntime-web in Node.js
      const wasmDir = path.dirname(this.modelPath);
      console.log(`[AI Service] Setting WASM path to: ${wasmDir}`);
      ort.env.wasm.wasmPaths = wasmDir + '/';
      
      if (!fs.existsSync(this.modelPath)) {
        throw new Error(`Model file not found at ${this.modelPath}`);
      }
      if (!fs.existsSync(this.tokenizerPath)) {
        throw new Error(`Tokenizer file not found at ${this.tokenizerPath}`);
      }

      const modelBuffer = fs.readFileSync(this.modelPath);
      this.session = await ort.InferenceSession.create(modelBuffer);
      const tokenizerData = fs.readFileSync(this.tokenizerPath, 'utf8');
      this.tokenizer = JSON.parse(tokenizerData);
    } catch (error) {
      console.error('Failed to initialize AI service:', error);
      throw error;
    }
  }

  private encode(text: string): number[] {
    if (!this.tokenizer) throw new Error('Tokenizer not initialized');
    return text.split('').map(c => this.tokenizer!.stoi[c] ?? this.tokenizer!.stoi[' ']);
  }

  private decode(tokens: number[]): string {
    if (!this.tokenizer) throw new Error('Tokenizer not initialized');
    return tokens.map(t => this.tokenizer!.itos[t.toString()] || '').join('');
  }

  private softmax(logits: Float32Array): number[] {
    const maxLogit = Math.max(...Array.from(logits));
    const scores = Array.from(logits).map(l => Math.exp(l - maxLogit));
    const sum = scores.reduce((a, b) => a + b, 0);
    return scores.map(s => s / sum);
  }

  private sample(probs: number[]): number {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < probs.length; i++) {
      acc += probs[i];
      if (r <= acc) return i;
    }
    return probs.length - 1;
  }

  public async generate(prompt: string, maxNewTokens: number = 200): Promise<string> {
    await this.init();
    if (!this.session) throw new Error('Inference session not initialized');

    const tokens = this.encode(prompt);
    
    for (let i = 0; i < maxNewTokens; i++) {
      const inputTokens = tokens.slice(-this.blockSize);
      const inputTensor = new ort.Tensor('int64', BigInt64Array.from(inputTokens.map(t => BigInt(t))), [1, inputTokens.length]);
      
      const outputs = await this.session.run({ input: inputTensor });
      const logits = outputs.output.data as Float32Array;
      
      // Get the last token's logits
      // output shape is (1, T, vocab_size)
      const vocabSize = this.tokenizer!.chars.length;
      const lastTokenLogits = logits.slice(-vocabSize);
      
      const probs = this.softmax(lastTokenLogits);
      const nextToken = this.sample(probs);
      
      tokens.push(nextToken);
      
      // Stop if we see a newline after "A:" response starts to look complete, 
      // or if we've reached a reasonable length.
      // For this demo, we can just stop at newline or max tokens.
      const lastChar = this.decode([nextToken]);
      if (lastChar === '\n' && i > 50) break; 
    }

    const fullText = this.decode(tokens);
    // Return only the completion
    return fullText.slice(prompt.length).trim();
  }
}
