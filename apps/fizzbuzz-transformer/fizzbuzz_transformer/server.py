import torch
from .model import FizzBuzzTransformer
from .tokenizer import SimpleTokenizer
import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import sys

# Load model globally to avoid reloading per request
device = 'cuda' if torch.cuda.is_available() else 'cpu'
tokenizer = SimpleTokenizer()
model_path = os.getenv("TRANSFORMER_MODEL_PATH", "fizzbuzz_model.pt")

print(f"Loading model from {model_path} on {device}...")

if not os.path.exists(model_path):
    print(f"Error: Model file {model_path} not found.")
    # We will exit if the model is missing in a real production environment
    # but for resilience we might want to stay alive with an error flag.
    model = None
else:
    model = FizzBuzzTransformer(
        vocab_size=tokenizer.vocab_size,
        n_embd=128,
        n_head=4,
        n_layer=4,
        block_size=256
    ).to(device)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    
    # Optimize model with torch.compile if available
    # DISABLED: causes too much overhead in this demo env
    # if hasattr(torch, "compile"):
    #     print("Compiling model for faster inference...")
    #     try:
    #         model = torch.compile(model)
    #         print("Model compiled successfully.")
    #     except Exception as e:
    #         print(f"Failed to compile model: {e}")
    
    print("Model loaded successfully.")

class TransformerHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/infer":
            self.send_error(404)
            return

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)
        
        prompt = data.get("prompt", "")
        tokens = data.get("tokens", 200)

        if not model:
            response = {"error": "Model not loaded"}
            self.send_response(500)
        else:
            try:
                context = torch.tensor(tokenizer.encode(prompt), dtype=torch.long, device=device).unsqueeze(0)
                generated = model.generate(context, max_new_tokens=tokens)
                output = tokenizer.decode(generated[0].tolist())
                response = {"response": output}
                self.send_response(200)
            except Exception as e:
                response = {"error": str(e)}
                self.send_response(500)

        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode('utf-8'))

    def do_GET(self):
        if self.path == "/health":
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "ok", "model_loaded": model is not None}).encode('utf-8'))
        else:
            self.send_error(404)

def run(server_class=HTTPServer, handler_class=TransformerHandler, port=3003):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Starting Transformer Service on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3003
    run(port=port)
