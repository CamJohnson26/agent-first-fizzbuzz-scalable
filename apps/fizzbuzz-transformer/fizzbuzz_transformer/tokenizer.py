class SimpleTokenizer:
    def __init__(self, chars=None):
        if chars is None:
            # Default set of characters for our FizzBuzz demo
            self.chars = sorted(list(set(
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 "
                ".,?!:;\"'-()[]{}<>@#$%^&*+=/_~\n"
            )))
        else:
            self.chars = chars
        
        self.vocab_size = len(self.chars)
        self.stoi = { ch:i for i,ch in enumerate(self.chars) }
        self.itos = { i:ch for i,ch in enumerate(self.chars) }

    def encode(self, s):
        # Use a fallback for unknown characters
        return [self.stoi.get(c, self.stoi.get(' ', 0)) for c in s]

    def decode(self, l):
        return ''.join([self.itos.get(i, '') for i in l])
