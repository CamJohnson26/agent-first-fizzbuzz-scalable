# FizzBuzz Transformer Demo

This is a very lightweight transformer model implemented in PyTorch to demonstrate an agent applying FizzBuzz logic to user chats.

## Project Structure

- `fizzbuzz_transformer/model.py`: Core Transformer model implementation.
- `fizzbuzz_transformer/tokenizer.py`: Simple character-level tokenizer.
- `fizzbuzz_transformer/data.py`: Synthetic data generator for FizzBuzz chats.
- `fizzbuzz_transformer/train.py`: Training script.
- `fizzbuzz_transformer/infer.py`: Inference script.

## Setup

1. Ensure you have Python 3.10+ installed.
2. Install dependencies:
   ```bash
   pip install torch
   ```
3. (Optional) Install as a package:
   ```bash
   pip install -e .
   ```

## Usage

### Training

To train the model on a synthetic dataset:
```bash
python -m fizzbuzz_transformer.train
```
This will save a `fizzbuzz_model.pt` file.

### Inference

To run inference using the trained model:
```bash
python -m fizzbuzz_transformer.infer --prompt "U: What is the fizzbuzz value of 15\nA:"
```

## Model Architecture

- Decoder-only Transformer
- 4 layers
- 4 attention heads
- 128 embedding dimension
- ~0.8M parameters
- Character-level tokenization

This model is designed to be tiny and runnable on low-end machines (CPU-friendly).
