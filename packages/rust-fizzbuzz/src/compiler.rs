use crate::types::{Rule, ProtectedRule, RuleConfig};
use sha2::{Sha256, Digest};

pub struct RuleCompiler;

impl RuleCompiler {
    pub fn compile<T>(rule: Rule<T>) -> ProtectedRule<T> {
        let config = RuleConfig {
            id: rule.id.clone(),
            priority: rule.priority,
            metadata: rule.metadata.clone(),
        };
        
        let serialized = serde_json::to_string(&config).unwrap();
        let mut hasher = Sha256::new();
        hasher.update(serialized);
        let checksum = format!("{:x}", hasher.finalize());

        ProtectedRule {
            rule,
            checksum,
        }
    }
}
