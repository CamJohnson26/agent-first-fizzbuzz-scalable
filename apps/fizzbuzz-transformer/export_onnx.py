import torch
import onnx
from fizzbuzz_transformer.model import FizzBuzzTransformer
from fizzbuzz_transformer.tokenizer import SimpleTokenizer
import json
import os

def export():
    # Load tokenizer and model
    tokenizer = SimpleTokenizer()
    model = FizzBuzzTransformer(vocab_size=tokenizer.vocab_size)
    
    # Load weights
    if os.path.exists('fizzbuzz_model.pt'):
        model.load_state_dict(torch.load('fizzbuzz_model.pt', map_location='cpu'))
    else:
        print("fizzbuzz_model.pt not found, using uninitialized weights")
    
    model.eval()

    # Create dummy input (B, T)
    dummy_input = torch.zeros((1, 1), dtype=torch.long)
    
    # Export to ONNX
    torch.onnx.export(
        model, 
        dummy_input, 
        "fizzbuzz_model.onnx", 
        input_names=['input'], 
        output_names=['output'],
        dynamic_axes={'input': {1: 'sequence_length'}, 'output': {1: 'sequence_length'}},
        opset_version=14
    )
    print("Model exported to fizzbuzz_model.onnx")
    
    # Save tokenizer mapping to JSON for Node.js
    with open('tokenizer_mapping.json', 'w') as f:
        json.dump({
            "chars": tokenizer.chars,
            "stoi": tokenizer.stoi,
            "itos": {str(k): v for k, v in tokenizer.itos.items()}
        }, f)
    print("Tokenizer mapping saved to tokenizer_mapping.json")

if __name__ == "__main__":
    export()
