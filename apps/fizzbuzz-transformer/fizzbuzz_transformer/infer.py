import torch
from .model import FizzBuzzTransformer
from .tokenizer import SimpleTokenizer
import argparse
import os

def main():
    parser = argparse.ArgumentParser(description="Run inference on the FizzBuzz Transformer model")
    parser.add_argument("--model", type=str, default="fizzbuzz_model.pt", help="Path to the model checkpoint")
    parser.add_argument("--prompt", type=str, default="U: What is the fizzbuzz value of 15\nA:", help="Input prompt for the model")
    parser.add_argument("--tokens", type=int, default=200, help="Maximum number of tokens to generate")
    args = parser.parse_args()

    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer = SimpleTokenizer()
    
    model = FizzBuzzTransformer(
        vocab_size=tokenizer.vocab_size,
        n_embd=128,
        n_head=4,
        n_layer=4,
        block_size=256
    ).to(device)

    if not os.path.exists(args.model):
        print(f"Error: Model file {args.model} not found. Please train the model first.")
        return

    model.load_state_dict(torch.load(args.model, map_location=device))
    model.eval()

    print(f"Generating from prompt: {args.prompt}")
    print("-" * 30)
    
    context = torch.tensor(tokenizer.encode(args.prompt), dtype=torch.long, device=device).unsqueeze(0)
    generated = model.generate(context, max_new_tokens=args.tokens)
    
    print(tokenizer.decode(generated[0].tolist()))

if __name__ == "__main__":
    main()
