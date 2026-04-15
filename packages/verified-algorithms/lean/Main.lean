import Fizzbuzz

/--
The main entry point for the FizzBuzz executable.
This script demonstrates the usage of the verified `fizzbuzz` function
by applying it to a sample list of natural numbers.
--/
def main (args : List String) : IO Unit := do
  match args with
  | ["range", s, e] =>
    match s.toNat?, e.toNat? with
    | some start, some stop =>
      for n in [start:stop+1] do
        IO.println (fizzbuzz n)
    | _, _ => IO.println "Error: Invalid range arguments"
  | [n_str] =>
    match n_str.toNat? with
    | some n => IO.println (fizzbuzz n)
    | none => IO.println "Error: Invalid argument"
  | _ =>
    IO.println "Usage: fizzbuzz <number> OR fizzbuzz range <start> <end>"
