pub mod types;
pub mod arithmetic;
pub mod engine;
pub mod compiler;

use wasm_bindgen::prelude::*;
use std::collections::HashMap;
use crate::types::{Rule, Engine, Composer, Fallback, Validator};
use crate::arithmetic::StandardArithmetic;
use crate::engine::{ResilientEngine, EngineConfig};
use crate::compiler::RuleCompiler;

#[wasm_bindgen]
pub fn compute(n: i32) -> String {
    let engine = create_engine();
    engine.evaluate(n)
}

#[wasm_bindgen]
pub fn compute_range(start: i32, end: i32) -> Vec<String> {
    let engine = create_engine();
    engine.evaluate_range(start, end)
}

fn create_engine() -> ResilientEngine<i32> {
    let rules = vec![
        RuleCompiler::compile(Rule {
            id: "fizz".to_string(),
            priority: 2,
            predicate: |n, a| a.is_divisible(n, 3),
            renderer: |_| "Fizz".to_string(),
            metadata: HashMap::from([("divisor".to_string(), "3".to_string())]),
        }).rule,
        RuleCompiler::compile(Rule {
            id: "buzz".to_string(),
            priority: 1,
            predicate: |n, a| a.is_divisible(n, 5),
            renderer: |_| "Buzz".to_string(),
            metadata: HashMap::from([("divisor".to_string(), "5".to_string())]),
        }).rule,
    ];

    let composer: Composer = |outputs| outputs.join("");
    let fallback: Fallback<i32> = |n| n.to_string();
    let arithmetic = Box::new(StandardArithmetic);
    let validators: Vec<Validator<i32>> = vec![
        |_, output| {
            if output.is_empty() {
                Err("Output invariant violated".to_string())
            } else {
                Ok(())
            }
        }
    ];

    ResilientEngine::new(EngineConfig {
        rules,
        arithmetic,
        composer,
        fallback,
        validators,
        enable_cross_check: true,
    })
}
