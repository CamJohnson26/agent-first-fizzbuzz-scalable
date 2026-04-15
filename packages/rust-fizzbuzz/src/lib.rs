use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compute(n: i32) -> String {
    let mut result = String::new();
    if n % 3 == 0 {
        result.push_str("Fizz");
    }
    if n % 5 == 0 {
        result.push_str("Buzz");
    }
    if result.is_empty() {
        result = n.to_string();
    }
    result
}

#[wasm_bindgen]
pub fn compute_range(start: i32, end: i32) -> Vec<String> {
    (start..=end).map(compute).collect()
}
