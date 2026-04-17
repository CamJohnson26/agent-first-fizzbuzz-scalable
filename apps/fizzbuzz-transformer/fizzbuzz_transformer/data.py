import random

def get_fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz", "both 3 and 5"
    if n % 3 == 0:
        return "Fizz", "3"
    if n % 5 == 0:
        return "Buzz", "5"
    return str(n), "neither 3 nor 5"

def generate_example(n=None):
    if n is None:
        n = random.randint(1, 100)
    
    fb_val, reason = get_fizzbuzz(n)
    
    if "both" in reason:
        div_logic = f"It is divisible by 3.\nIt is divisible by 5, so both."
    elif "3" in reason:
        div_logic = f"It is divisible by 3.\nIt is not divisible by 5."
    elif "5" in reason:
        div_logic = f"It is not divisible by 3.\nIt is divisible by 5."
    else:
        div_logic = f"It is not divisible by 3.\nIt is not divisible by 5."

    example = f"U: What is the fizzbuzz value of {n}\n"
    example += f"A:\nThinking...\n"
    example += f"The user is asking the fizzbuzz value of {n}. I need to check if {n} is divisible by 3, 5, or both\n\n"
    example += f"{div_logic}\n\n"
    example += f"The answer is: \"{fb_val}\""
    
    return example

def generate_dataset(num_examples=1000):
    dataset = ""
    for _ in range(num_examples):
        dataset += generate_example() + "\n\n"
    return dataset
