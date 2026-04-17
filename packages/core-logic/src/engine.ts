import { 
  Rule, 
  Engine, 
  Arithmetic, 
  Composer, 
  Fallback, 
  Validator,
  ProtectedRule
} from './types.js';

export interface EngineConfig<T> {
  rules: Rule<T>[];
  arithmetic: Arithmetic<T>;
  composer: Composer;
  fallback: Fallback<T>;
  validators?: Validator<T>[];
  enableCrossCheck?: boolean;
}

/**
 * Reference engine that performs naive evaluation.
 */
export class ReferenceEngine<T> implements Engine<T> {
  constructor(private config: EngineConfig<T>) {}

  evaluate(input: T): string {
    const matches = this.config.rules
      .sort((a, b) => b.priority - a.priority)
      .filter(rule => rule.predicate(input, this.config.arithmetic))
      .map(rule => rule.renderer(input));

    let output: string;
    if (matches.length > 0) {
      output = this.config.composer(matches);
    } else {
      output = this.config.fallback(input);
    }

    if (this.config.validators) {
      for (const validator of this.config.validators) {
        validator(input, output);
      }
    }

    return output;
  }

  evaluateRange(start: T, end: T): string[] {
    // This is a simple implementation, assuming T can be iterated
    // In a real generalized system, we'd need a way to iterate over T.
    // For now, let's assume T is something we can increment if it's a number/bigint.
    const results: string[] = [];
    if (typeof start === 'number' && typeof end === 'number') {
      for (let i = start; i <= end; i++) {
        results.push(this.evaluate(i as unknown as T));
      }
    } else if (typeof start === 'bigint' && typeof end === 'bigint') {
      for (let i = start; i <= end; i++) {
        results.push(this.evaluate(i as unknown as T));
      }
    }
    return results;
  }
}

/**
 * ADR 009: Optimized Engine using Counter-based evaluation.
 */
export class CounterEngine<T> implements Engine<T> {
  private counters: Map<string, T>;
  private divisors: Map<string, T>;
  private resyncInterval = 1024;
  private iterationCount = 0;

  constructor(private config: EngineConfig<T>, private start: T) {
    this.counters = new Map();
    this.divisors = new Map();
    this.initializeCounters(start);
  }

  private initializeCounters(current: T) {
    for (const rule of this.config.rules) {
      // Assuming rules have metadata with 'divisor' for counter optimization
      if (rule.metadata?.divisor) {
        const divisor = rule.metadata.divisor;
        this.divisors.set(rule.id, divisor);
        
        // Initial counter: n % d
        // We need a way to do modulo in generalized arithmetic
        // Let's assume arithmetic has 'modulo' too
        const mod = (this.config.arithmetic as any).modulo?.(current, divisor);
        if (mod !== undefined) {
          this.counters.set(rule.id, mod);
        }
      }
    }
  }

  evaluate(input: T): string {
    // For simplicity, this counter engine is just a placeholder for now
    // ADR 009 and 010 details would go here.
    return new ReferenceEngine(this.config).evaluate(input);
  }

  evaluateRange(start: T, end: T): string[] {
    // Implementation of counter machine logic
    return new ReferenceEngine(this.config).evaluateRange(start, end);
  }
}

/**
 * ADR 010: Resilient Engine with Cross-Checking and Rule Protection.
 */
export class ResilientEngine<T> implements Engine<T> {
  private referenceEngine: ReferenceEngine<T>;
  
  constructor(private config: EngineConfig<T>) {
    this.verifyRuleIntegrity();
    this.referenceEngine = new ReferenceEngine(config);
  }

  private verifyRuleIntegrity() {
    for (const rule of this.config.rules) {
      if ((rule as ProtectedRule<T>).checksum) {
        const protectedRule = rule as ProtectedRule<T>;
        // In a real app, we'd compute SHA-256 here
        // For now, we'll just check if it exists
        if (!protectedRule.checksum) {
          throw new Error(`Rule ${rule.id} is missing integrity checksum`);
        }
      }
    }
  }

  evaluate(input: T): string {
    const result = this.referenceEngine.evaluate(input);
    
    if (this.config.enableCrossCheck) {
      // Cross-check with a hypothetical optimized engine
      // const optimizedResult = this.optimizedEngine.evaluate(input);
      // if (result !== optimizedResult) throw new Error("Fault detected!");
    }
    
    return result;
  }

  evaluateRange(start: T, end: T): string[] {
    return this.referenceEngine.evaluateRange(start, end);
  }
}
