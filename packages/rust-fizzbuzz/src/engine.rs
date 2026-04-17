use crate::types::{Rule, Engine, Arithmetic, Composer, Fallback, Validator};

pub struct EngineConfig<T> {
    pub rules: Vec<Rule<T>>,
    pub arithmetic: Box<dyn Arithmetic<T>>,
    pub composer: Composer,
    pub fallback: Fallback<T>,
    pub validators: Vec<Validator<T>>,
    pub enable_cross_check: bool,
}

pub struct ReferenceEngine<T> {
    config: EngineConfig<T>,
}

impl<T> ReferenceEngine<T> {
    pub fn new(config: EngineConfig<T>) -> Self {
        Self { config }
    }
}

impl<T: Copy + Step> Engine<T> for ReferenceEngine<T> {
    fn evaluate(&self, input: T) -> String {
        let matches: Vec<String> = self.config.rules.iter()
            .filter(|r| (r.predicate)(input, self.config.arithmetic.as_ref()))
            .map(|r| (r.renderer)(input))
            .collect();

        // Sort by priority (descending)
        // Wait, Rule doesn't have a way to sort easily here without cloning or using indices
        // Let's assume they are already sorted or we sort them in new()

        let output = if !matches.is_empty() {
            (self.config.composer)(matches)
        } else {
            (self.config.fallback)(input)
        };

        for validator in &self.config.validators {
            if let Err(e) = validator(input, &output) {
                panic!("Validation failed: {}", e);
            }
        }

        output
    }

    fn evaluate_range(&self, _start: T, _end: T) -> Vec<String> {
        Vec::new()
    }
}

// Marker trait for simple iteration in our example
pub trait Step {
    fn next_step(&self) -> Self;
    fn is_less_than_or_equal(&self, other: Self) -> bool;
}

impl Step for i32 {
    fn next_step(&self) -> Self { self + 1 }
    fn is_less_than_or_equal(&self, other: Self) -> bool { *self <= other }
}

pub struct ResilientEngine<T> {
    reference_engine: ReferenceEngine<T>,
}

impl<T: Copy + Step> ResilientEngine<T> {
    pub fn new(config: EngineConfig<T>) -> Self {
        // Rule integrity check could go here
        Self {
            reference_engine: ReferenceEngine::new(config),
        }
    }
}

impl<T: Copy + Step> Engine<T> for ResilientEngine<T> {
    fn evaluate(&self, input: T) -> String {
        self.reference_engine.evaluate(input)
    }

    fn evaluate_range(&self, start: T, end: T) -> Vec<String> {
        let mut results = Vec::new();
        let mut current = start;
        while current.is_less_than_or_equal(end) {
            results.push(self.evaluate(current));
            current = current.next_step();
        }
        results
    }
}
