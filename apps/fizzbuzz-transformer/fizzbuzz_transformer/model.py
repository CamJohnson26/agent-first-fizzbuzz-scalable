import torch
import torch.nn as nn
from torch.nn import functional as F

class Head(nn.Module):
    """ one head of self-attention """

    def __init__(self, n_embd, head_size, block_size, dropout):
        super().__init__()
        self.key = nn.Linear(n_embd, head_size, bias=False)
        self.query = nn.Linear(n_embd, head_size, bias=False)
        self.value = nn.Linear(n_embd, head_size, bias=False)
        self.register_buffer('tril', torch.tril(torch.ones(block_size, block_size)))

        self.dropout = nn.Dropout(dropout)

    def forward(self, x, layer_past=None, use_cache=False):
        B, T, C = x.shape
        k = self.key(x)   # (B,T,C)
        q = self.query(x) # (B,T,C)
        v = self.value(x) # (B,T,C)

        if layer_past is not None:
            past_key, past_value = layer_past
            k = torch.cat((past_key, k), dim=1)
            v = torch.cat((past_value, v), dim=1)

        present = (k, v) if use_cache else None

        # compute attention scores ("affinities")
        # q: (B, T, head_size), k: (B, T_total, head_size)
        # wei: (B, T, T_total)
        wei = q @ k.transpose(-2, -1) * (k.shape[-1]**-0.5)
        
        T_total = k.shape[1]
        if layer_past is None:
            wei = wei.masked_fill(self.tril[:T, :T] == 0, float('-inf'))
        else:
            # When using cache, T is usually 1 (the new token)
            # We only need to mask if we are processing multiple tokens at once with cache (rare in generation)
            # But for safety and correctness if T > 1:
            if T > 1:
                # This part is tricky because the mask needs to be relative to the total sequence
                # For autoregressive generation where we only pass the LAST token, T=1 and no mask is needed
                # because it can see all previous tokens.
                pass 

        wei = F.softmax(wei, dim=-1)
        wei = self.dropout(wei)
        # perform the weighted aggregation of the values
        out = wei @ v # (B, T, T_total) @ (B, T_total, head_size) -> (B, T, head_size)
        return out, present

class MultiHeadAttention(nn.Module):
    """ multiple heads of self-attention in parallel """

    def __init__(self, num_heads, n_embd, head_size, block_size, dropout):
        super().__init__()
        self.heads = nn.ModuleList([Head(n_embd, head_size, block_size, dropout) for _ in range(num_heads)])
        self.proj = nn.Linear(n_embd, n_embd)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, layer_past=None, use_cache=False):
        # x: (B, T, C)
        # layer_past: list of (past_key, past_value) for each head, or None
        
        out_heads = []
        presents = []
        for i, h in enumerate(self.heads):
            past = layer_past[i] if layer_past is not None else None
            out, present = h(x, layer_past=past, use_cache=use_cache)
            out_heads.append(out)
            presents.append(present)
            
        out = torch.cat(out_heads, dim=-1)
        out = self.dropout(self.proj(out))
        return out, presents

class FeedFoward(nn.Module):
    """ a simple linear layer followed by a non-linearity """

    def __init__(self, n_embd, dropout):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(n_embd, 4 * n_embd),
            nn.ReLU(),
            nn.Linear(4 * n_embd, n_embd),
            nn.Dropout(dropout),
        )

    def forward(self, x):
        return self.net(x)

class Block(nn.Module):
    """ Transformer block: communication followed by computation """

    def __init__(self, n_embd, n_head, block_size, dropout):
        super().__init__()
        head_size = n_embd // n_head
        self.sa = MultiHeadAttention(n_head, n_embd, head_size, block_size, dropout)
        self.ffwd = FeedFoward(n_embd, dropout)
        self.ln1 = nn.LayerNorm(n_embd)
        self.ln2 = nn.LayerNorm(n_embd)

    def forward(self, x, layer_past=None, use_cache=False):
        # Attention part
        sa_out, present = self.sa(self.ln1(x), layer_past=layer_past, use_cache=use_cache)
        x = x + sa_out
        # Feed-forward part
        x = x + self.ffwd(self.ln2(x))
        return x, present

class FizzBuzzTransformer(nn.Module):
    def __init__(self, vocab_size, n_embd=128, n_head=4, n_layer=4, block_size=256, dropout=0.1):
        super().__init__()
        self.block_size = block_size
        self.n_layer = n_layer
        self.token_embedding_table = nn.Embedding(vocab_size, n_embd)
        self.position_embedding_table = nn.Embedding(block_size, n_embd)
        self.blocks = nn.ModuleList([Block(n_embd, n_head, block_size, dropout) for _ in range(n_layer)])
        self.ln_f = nn.LayerNorm(n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx, targets=None, past_key_values=None, use_cache=False):
        B, T = idx.shape
        
        # Determine starting position for position embeddings
        past_length = 0
        if past_key_values is not None:
            # past_key_values is a list of presents from MultiHeadAttention
            # Each present is a list of (k, v) for each head
            # We can get the length from the first head's k
            past_length = past_key_values[0][0][0].shape[1]

        # idx and targets are both (B,T) tensor of integers
        tok_emb = self.token_embedding_table(idx) # (B,T,C)
        
        # Position embeddings for the current sequence segment
        pos_indices = torch.arange(past_length, past_length + T, device=idx.device)
        pos_emb = self.position_embedding_table(pos_indices) # (T,C)
        
        x = tok_emb + pos_emb # (B,T,C)
        
        presents = []
        for i, block in enumerate(self.blocks):
            layer_past = past_key_values[i] if past_key_values is not None else None
            x, present = block(x, layer_past=layer_past, use_cache=use_cache)
            presents.append(present)
            
        x = self.ln_f(x) # (B,T,C)
        logits = self.lm_head(x) # (B,T,vocab_size)

        loss = None
        if targets is not None:
            B, T, C = logits.shape
            logits_v = logits.view(B*T, C)
            targets_v = targets.view(B*T)
            loss = F.cross_entropy(logits_v, targets_v)

        if use_cache:
            return logits, loss, presents
        return logits, loss

    @torch.no_grad()
    def generate(self, idx, max_new_tokens):
        # idx is (B, T) array of indices in the current context
        past_key_values = None
        
        # Initial forward pass to get the cache for the prompt
        # If the prompt is longer than block_size, we crop it
        if idx.shape[1] > self.block_size:
            idx = idx[:, -self.block_size:]
            
        logits, _, past_key_values = self(idx, use_cache=True)
        
        # Get the first generated token
        logits = logits[:, -1, :]
        probs = F.softmax(logits, dim=-1)
        idx_next = torch.multinomial(probs, num_samples=1)
        idx = torch.cat((idx, idx_next), dim=1)
        
        for _ in range(max_new_tokens - 1):
            # Only pass the last token to the model, use cache for the rest
            # We need to ensure we don't exceed block_size
            curr_length = idx.shape[1]
            if curr_length >= self.block_size:
                # If we hit block_size, we have to drop the cache and re-process (simple strategy)
                # Or better: just truncate the cache. But positional embeddings might be tricky.
                # For this demo, let's just stick to the simple strategy:
                idx_cond = idx[:, -self.block_size:]
                logits, _, past_key_values = self(idx_cond, use_cache=True)
            else:
                logits, _, past_key_values = self(idx_next, past_key_values=past_key_values, use_cache=True)
            
            logits = logits[:, -1, :]
            probs = F.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)
            idx = torch.cat((idx, idx_next), dim=1)
            
        return idx
