use serde::{Serialize, Deserialize};
use std::collections::HashMap;

pub trait Arithmetic<T> {
    fn is_divisible(&self, n: T, divisor: T) -> bool;
    fn to_string(&self, n: T) -> String;
}

pub type Predicate<T> = fn(T, &dyn Arithmetic<T>) -> bool;
pub type Renderer<T> = fn(T) -> String;

pub struct Rule<T> {
    pub id: String,
    pub predicate: Predicate<T>,
    pub renderer: Renderer<T>,
    pub priority: i32,
    pub metadata: HashMap<String, String>,
}

#[derive(Serialize, Deserialize)]
pub struct RuleConfig {
    pub id: String,
    pub priority: i32,
    pub metadata: HashMap<String, String>,
}

pub struct ProtectedRule<T> {
    pub rule: Rule<T>,
    pub checksum: String,
}

pub trait Engine<T> {
    fn evaluate(&self, input: T) -> String;
    fn evaluate_range(&self, start: T, end: T) -> Vec<String>;
}

pub type Composer = fn(Vec<String>) -> String;
pub type Fallback<T> = fn(T) -> String;
pub type Validator<T> = fn(T, &str) -> Result<(), String>;
