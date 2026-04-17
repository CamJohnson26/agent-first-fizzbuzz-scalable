import { Rule, ProtectedRule } from './types.js';
import { createHash } from 'crypto';

/**
 * ADR 009: Compiled Rule Approach.
 * Rules are "compiled" into immutable runtime objects with upfront validation.
 */
export class RuleCompiler {
  static compile<T>(rule: Rule<T>): ProtectedRule<T> {
    // Upfront validation
    if (rule.priority < 0) {
      throw new Error(`Invalid priority for rule ${rule.id}`);
    }

    // Compute checksum for ADR 010
    const serialized = JSON.stringify({
      id: rule.id,
      priority: rule.priority,
      metadata: rule.metadata
    });
    const checksum = createHash('sha256').update(serialized).digest('hex');

    // Return immutable frozen object
    return Object.freeze({
      ...rule,
      checksum
    });
  }
}
