/--
The core FizzBuzz function implemented in Lean.
We use the standard definition:
- "FizzBuzz" if n is divisible by 15.
- "Fizz" if n is divisible by 3.
- "Buzz" if n is divisible by 5.
- The string representation of n otherwise.
--/
def fizzbuzz (n : Nat) : String :=
  if n % 15 == 0 then "FizzBuzz"
  else if n % 3 == 0 then "Fizz"
  else if n % 5 == 0 then "Buzz"
  else toString n

/--
Proof that if a number is divisible by 15, it returns "FizzBuzz".
This is straightforward as it's the first condition in the function.
--/
theorem fizzbuzz_15 (n : Nat) (h : n % 15 = 0) : fizzbuzz n = "FizzBuzz" := by
  unfold fizzbuzz
  simp [h]

/--
Proof that if a number is divisible by 3 but not 5, it returns "Fizz".
Key Insight: If a number is divisible by 3 but not 5, it cannot be divisible by 15.
--/
theorem fizzbuzz_3 (n : Nat) (h3 : n % 3 = 0) (h5 : n % 5 ≠ 0) : fizzbuzz n = "Fizz" := by
  unfold fizzbuzz
  -- We must prove n % 15 ≠ 0 first, so the first `if` branch is not taken.
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    -- If n % 15 = 0, then 15 ∣ n.
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    -- Since 5 ∣ 15 and 15 ∣ n, then 5 ∣ n.
    have h5_dvd : 5 ∣ n := Nat.dvd_trans (by decide : 5 ∣ 15) h15_dvd
    -- This means n % 5 = 0, which contradicts our hypothesis h5.
    have h5_zero : n % 5 = 0 := Nat.mod_eq_zero_of_dvd h5_dvd
    contradiction
  simp [h15, h3]

/--
Proof that if a number is divisible by 5 but not 3, it returns "Buzz".
Key Insight: If a number is divisible by 5 but not 3, it cannot be divisible by 15.
--/
theorem fizzbuzz_5 (n : Nat) (h3 : n % 3 ≠ 0) (h5 : n % 5 = 0) : fizzbuzz n = "Buzz" := by
  unfold fizzbuzz
  -- We must prove n % 15 ≠ 0 first.
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    -- If n % 15 = 0, then 15 ∣ n.
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    -- Since 3 ∣ 15 and 15 ∣ n, then 3 ∣ n.
    have h3_dvd : 3 ∣ n := Nat.dvd_trans (by decide : 3 ∣ 15) h15_dvd
    -- This means n % 3 = 0, which contradicts our hypothesis h3.
    have h3_zero : n % 3 = 0 := Nat.mod_eq_zero_of_dvd h3_dvd
    contradiction
  simp [h15, h3, h5]

/--
Proof that if a number is neither divisible by 3 nor by 5, it returns toString n.
--/
theorem fizzbuzz_other (n : Nat) (h3 : n % 3 ≠ 0) (h5 : n % 5 ≠ 0) : fizzbuzz n = toString n := by
  unfold fizzbuzz
  -- If n is not divisible by 3 or 5, it's also not divisible by 15.
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    have h3_dvd : 3 ∣ n := Nat.dvd_trans (by decide : 3 ∣ 15) h15_dvd
    have h3_zero : n % 3 = 0 := Nat.mod_eq_zero_of_dvd h3_dvd
    contradiction
  simp [h15, h3, h5]
