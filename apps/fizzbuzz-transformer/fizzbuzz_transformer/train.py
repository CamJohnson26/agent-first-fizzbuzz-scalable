import torch
import torch.optim as optim
from .model import FizzBuzzTransformer
from .tokenizer import SimpleTokenizer
from .data import generate_dataset
import os

# Hyperparameters
batch_size = 32
block_size = 256
max_iters = 300
eval_interval = 50
learning_rate = 1e-3
device = 'cuda' if torch.cuda.is_available() else 'cpu'
eval_iters = 20
n_embd = 128
n_head = 4
n_layer = 4
dropout = 0.1

def get_batch(data, batch_size, block_size):
    # generate a small batch of data of inputs x and targets y
    ix = torch.randint(len(data) - block_size, (batch_size,))
    x = torch.stack([data[i:i+block_size] for i in ix])
    y = torch.stack([data[i+1:i+block_size+1] for i in ix])
    x, y = x.to(device), y.to(device)
    return x, y

@torch.no_grad()
def estimate_loss(model, train_data, val_data):
    out = {}
    model.eval()
    for split, data in [('train', train_data), ('val', val_data)]:
        losses = torch.zeros(eval_iters)
        for k in range(eval_iters):
            X, Y = get_batch(data, batch_size, block_size)
            logits, loss = model(X, Y)
            losses[k] = loss.item()
        out[split] = losses.mean()
    model.train()
    return out

def main():
    # Data preparation
    tokenizer = SimpleTokenizer()
    print("Generating synthetic dataset...")
    raw_data = generate_dataset(2000)
    data = torch.tensor(tokenizer.encode(raw_data), dtype=torch.long)
    
    # Split into train and val
    n = int(0.9*len(data))
    train_data = data[:n]
    val_data = data[n:]
    
    model = FizzBuzzTransformer(
        vocab_size=tokenizer.vocab_size,
        n_embd=n_embd,
        n_head=n_head,
        n_layer=n_layer,
        block_size=block_size,
        dropout=dropout
    ).to(device)
    
    # print the number of parameters in the model
    print(sum(p.numel() for p in model.parameters())/1e6, 'M parameters')
    
    optimizer = optim.AdamW(model.parameters(), lr=learning_rate)
    
    print(f"Starting training on {device}...")
    for iter in range(max_iters):
        # every once in a while evaluate the loss on train and val sets
        if iter % eval_interval == 0 or iter == max_iters - 1:
            losses = estimate_loss(model, train_data, val_data)
            print(f"step {iter}: train loss {losses['train']:.4f}, val loss {losses['val']:.4f}")
            
        # sample a batch of data
        xb, yb = get_batch(train_data, batch_size, block_size)
        
        # evaluate the loss
        logits, loss = model(xb, yb)
        optimizer.zero_grad(set_to_none=True)
        loss.backward()
        optimizer.step()
        
    # Save the model
    save_path = 'fizzbuzz_model.pt'
    torch.save(model.state_dict(), save_path)
    print(f"Model saved to {save_path}")

if __name__ == "__main__":
    main()
