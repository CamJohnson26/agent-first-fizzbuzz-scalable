def fizzbuzz (n : Nat) : String :=
  if n % 15 == 0 then "FizzBuzz"
  else if n % 3 == 0 then "Fizz"
  else if n % 5 == 0 then "Buzz"
  else toString n

/-- Proof that if a number is divisible by 15, it returns "FizzBuzz" -/
theorem fizzbuzz_15 (n : Nat) (h : n % 15 = 0) : fizzbuzz n = "FizzBuzz" := by
  unfold fizzbuzz
  simp [h]

/-- Proof that if a number is divisible by 3 but not 5, it returns "Fizz" -/
theorem fizzbuzz_3 (n : Nat) (h3 : n % 3 = 0) (h5 : n % 5 ≠ 0) : fizzbuzz n = "Fizz" := by
  unfold fizzbuzz
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    have h5_dvd : 5 ∣ n := Nat.dvd_trans (by decide : 5 ∣ 15) h15_dvd
    have h5_zero : n % 5 = 0 := Nat.mod_eq_zero_of_dvd h5_dvd
    contradiction
  simp [h15, h3]

/-- Proof that if a number is divisible by 5 but not 3, it returns "Buzz" -/
theorem fizzbuzz_5 (n : Nat) (h3 : n % 3 ≠ 0) (h5 : n % 5 = 0) : fizzbuzz n = "Buzz" := by
  unfold fizzbuzz
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    have h3_dvd : 3 ∣ n := Nat.dvd_trans (by decide : 3 ∣ 15) h15_dvd
    have h3_zero : n % 3 = 0 := Nat.mod_eq_zero_of_dvd h3_dvd
    contradiction
  simp [h15, h3, h5]

/-- Proof that if a number is neither divisible by 3 nor 5, it returns toString n -/
theorem fizzbuzz_other (n : Nat) (h3 : n % 3 ≠ 0) (h5 : n % 5 ≠ 0) : fizzbuzz n = toString n := by
  unfold fizzbuzz
  have h15 : n % 15 ≠ 0 := by
    intro h15_zero
    have h15_dvd : 15 ∣ n := Nat.dvd_of_mod_eq_zero h15_zero
    have h3_dvd : 3 ∣ n := Nat.dvd_trans (by decide : 3 ∣ 15) h15_dvd
    have h3_zero : n % 3 = 0 := Nat.mod_eq_zero_of_dvd h3_dvd
    contradiction
  simp [h15, h3, h5]
