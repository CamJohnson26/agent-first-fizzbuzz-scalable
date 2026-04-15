import Fizzbuzz

def main : IO Unit := do
  let results := [1, 3, 5, 15, 16].map (fun n => (n, fizzbuzz n))
  for (n, res) in results do
    IO.println s!"fizzbuzz({n}) = {res}"
