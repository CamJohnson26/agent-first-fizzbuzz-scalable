/--
The main entry point for the FizzBuzz executable.
This script demonstrates the usage of the verified `fizzbuzz` function
by applying it to a sample list of natural numbers.
--/
import Fizzbuzz

def main : IO Unit := do
  let results := [1, 3, 5, 15, 16].map (fun n => (n, fizzbuzz n))
  for (n, res) in results do
    IO.println s!"fizzbuzz({n}) = {res}"
