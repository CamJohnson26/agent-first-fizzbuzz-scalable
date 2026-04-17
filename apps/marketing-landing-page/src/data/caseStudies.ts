export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  title: string;
  stats: string;
  desc: string;
  icon: string; // Lucide icon name or similar
  content: string; // Markdown content
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'global-bank',
    company: 'Global Bank of America',
    industry: 'Finance',
    title: 'Optimizing Global Transaction Logic',
    stats: '40% reduction in latency',
    desc: 'How the world\'s largest bank migrated their legacy FizzBuzz implementations to our scalable engine, resulting in unprecedented transaction speeds.',
    icon: 'BarChart',
    content: `
# Global Bank of America: Scaling Financial Logic

## The Challenge
Global Bank of America processed over 100 billion transactions daily. Their legacy FizzBuzz-based validation logic was struggling to keep up with the sub-millisecond requirements of modern high-frequency trading and retail banking.

## The Solution
By implementing **FizzBuzz Scalable Enterprise**, the bank was able to:
- Decentralize their logic across 50 global nodes.
- Use our **Rust-based processing engine** for maximum throughput.
- Leverage **SOC2 Type II** compliant infrastructure.

## The Results
> "FizzBuzz Scalable didn't just solve our latency issues; it redefined what we thought was possible in automated transaction validation."
> — *Director of Engineering, Global Bank of America*

- **40% reduction** in end-to-end transaction latency.
- **Zero downtime** during the 6-month migration period.
- **$12M annual savings** in infrastructure overhead.
`
  },
  {
    id: 'spacexperience',
    company: 'SpaceXperience',
    industry: 'Aerospace',
    title: 'Mission-Critical Orbital Calculations',
    stats: '100% fidelity guaranteed',
    desc: 'Zero-room for error in orbital mechanics. SpaceXperience relies on our SOC2 compliant infrastructure for their mission-critical algorithmic needs.',
    icon: 'Rocket',
    content: `
# SpaceXperience: To the Moon and Beyond with 100% Fidelity

## The Challenge
In aerospace, a single rounding error can mean the difference between a successful mission and a catastrophic failure. SpaceXperience needed a logic engine that guaranteed 100% fidelity across billions of orbital calculations.

## The Solution
We provided SpaceXperience with a dedicated **Air-Gapped Instance** of FizzBuzz Scalable, featuring:
- **Lean Theorem Prover** integration for formal verification of all logic paths.
- **Multi-region redundancy** with sub-nanosecond synchronization.
- **Hardened Security** protocols for satellite-to-ground communication.

## The Results
- **100% Accuracy** across 4.5 trillion calculations.
- **Success stories** from 12 orbital launches and 3 deep-space probes.
- **Industry Standard** certification for aerospace algorithmic safety.
`
  },
  {
    id: 'healthscale',
    company: 'HealthScale Global',
    industry: 'Healthcare',
    title: 'Genomic Sequencing Orchestration',
    stats: '2.5PB of data processed monthly',
    desc: 'Orchestrating complex genomic analysis requires massive scale. Our distributed engine provides the necessary throughput for modern life sciences.',
    icon: 'Microscope',
    content: `
# HealthScale Global: Decoding Life at Scale

## The Challenge
Genomic sequencing generates petabytes of data. HealthScale Global needed to orchestrate complex "If-Then-Else" logic (at its core, a sophisticated FizzBuzz) across massive datasets to identify genetic markers in record time.

## The Solution
HealthScale Global adopted our **Distributed Processing Engine**, allowing them to:
- Parallelize sequencing logic across **10,000+ vCPUs**.
- Use our **Auto-scaling technology** to handle bursty workloads during major research breakthroughs.
- Maintain **HIPAA and GDPR compliance** with encrypted-at-rest data handling.

## The Results
- **2.5PB of data** processed every month.
- **75% reduction** in time-to-insight for personalized medicine.
- **Global reach** with researchers accessing data across 4 continents.
`
  },
  {
    id: 'shopify-extreme',
    company: 'ShopifyPlus Extreme',
    industry: 'E-commerce',
    title: 'Black Friday Scalability',
    stats: '10M+ operations per second',
    desc: 'Handling peak traffic during major sales events. ShopifyPlus Extreme uses our Edge Orchestration to ensure zero downtime during global flash sales.',
    icon: 'Zap',
    content: `
# ShopifyPlus Extreme: Winning Black Friday

## The Challenge
During Black Friday, traffic spikes can be 100x higher than average. ShopifyPlus Extreme needed a way to handle millions of promotional logic checks every second without slowing down the checkout experience.

## The Solution
By deploying our **Edge Orchestration** nodes, ShopifyPlus Extreme was able to:
- Move computation closer to the user, reducing round-trip times.
- Implement **Throttling and Rate Limiting** that intelligently prioritizes high-value transactions.
- Use our **Real-time Monitoring** dashboard to track global performance.

## The Results
- **10M+ operations per second** during peak load.
- **Zero downtime** recorded during the busiest shopping weekend in history.
- **99.999% availability** maintained throughout the global event.
`
  }
];
