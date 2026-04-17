export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: 'Engineering' | 'Product' | 'Company';
  content: string;
  isMarkdown?: boolean;
  image: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'building-for-scale-turborepo',
    title: 'Building for Scale: Why We Chose a Turborepo Foundation',
    excerpt: 'Discover how our architectural choices enable rapid development and high-fidelity algorithmic execution at enterprise scale.',
    date: 'April 10, 2026',
    author: 'Engineering Team',
    category: 'Engineering',
    tags: ['Architecture', 'Turborepo', 'Scalability'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>At FizzBuzz Scalable, we don't just write code; we build foundations. When we set out to create the world's most advanced algorithmic orchestration engine, we knew that our internal structure had to be as robust as the systems we deploy for our clients.</p>
      
      <h2>The Monorepo Challenge</h2>
      <p>Managing multiple services—our Core Engine, Distributed Processing nodes, and the Web Dashboard—requires a delicate balance between isolation and integration. We needed a structure that allowed our team (and our AI agents) to move fast without breaking things.</p>
      
      <h2>Our Decision: Turborepo + pnpm</h2>
      <p>We chose <strong>Turborepo</strong> combined with <strong>pnpm workspaces</strong>. This wasn't just a technical preference; it was a strategic decision to ensure:</p>
      <ul>
        <li><strong>Unmatched Performance:</strong> Fast caching means our build times stay low even as our codebase grows exponentially.</li>
        <li><strong>Strict Dependency Management:</strong> Using pnpm prevents "phantom dependencies," ensuring that what you see is exactly what you get.</li>
        <li><strong>Agent-Friendly Configuration:</strong> Our "agent-first" philosophy means our codebase is optimized for AI collaboration, and Turborepo's explicit task orchestration is perfect for this.</li>
      </ul>
      
      <h2>Why This Matters for Our Customers</h2>
      <p>A solid foundation means we can ship features faster, maintain higher security standards, and guarantee the 100% fidelity that our enterprise partners expect. When you choose FizzBuzz Scalable, you're choosing a platform built on the gold standard of modern engineering.</p>
    `
  },
  {
    id: 'future-of-node-js-25',
<<<<<<< HEAD
    title: 'The Future is Node.js 25: Why FizzBuzz Scalable is Built on the Latest Tech',
    excerpt: 'We believe in using the best tools for the job. That\'s why we\'ve standardized on Node.js 25.9.0 for all our core services.',
=======
    title: 'Living at the Edge: Why Node.js 24.14.1 is Our Competitive Advantage',
    excerpt: 'While others are stuck in the past, we\'re building the future. Discover how our standardized Node.js 24 stack delivers the sub-millisecond latency our enterprise clients demand.',
>>>>>>> feature/node-24-lts-alignment
    date: 'April 12, 2026',
    author: 'CTO Office',
    category: 'Engineering',
    tags: ['Node.js', 'TypeScript', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>In the fast-moving world of enterprise logic, staying still is the same as moving backward. While many are still catching up to Node.js 20 or 22, FizzBuzz Scalable is already looking ahead.</p>
      
<<<<<<< HEAD
      <h2>Standardizing on v25.9.0</h2>
      <p>We've made the bold decision to use <strong>Node.js 25.9.0</strong> and <strong>TypeScript</strong> as our primary stack. This combination gives us the perfect mix of performance, safety, and modern features.</p>
=======
      <h2>Standardizing on Absolute Excellence</h2>
      <p>We've standardized on <strong>Node.js 24.14.1</strong> and <strong>TypeScript</strong> across every core service. This isn't just about having the latest version; it's about unlocking performance capabilities that were previously impossible.</p>
>>>>>>> feature/node-24-lts-alignment
      
      <h2>The Benefits of Living on the Edge</h2>
      <p>By leveraging the latest V8 engine improvements and ECMAScript Modules (ESM), we provide:</p>
      <ul>
        <li><strong>Sub-millisecond Latency:</strong> Our engine is optimized for the latest runtime enhancements, ensuring your logic executes at the speed of light.</li>
        <li><strong>Type Safety at Scale:</strong> TypeScript allows us to manage complex distributed systems with confidence, catching bugs before they ever reach production.</li>
        <li><strong>Future-Proof Infrastructure:</strong> We don't just solve today's problems; we're building for the challenges of 2030 and beyond.</li>
      </ul>
      
      <h2>A Message to Investors and Talent</h2>
      <p>We are a company that values technical excellence and isn't afraid to lead. To future employees: you'll work with the most modern stack in the industry. To investors: our technological lead is our competitive moat.</p>
    `
  },
  {
    id: 'design-for-agents',
    title: 'Design for Agents: Creating a Visual Identity for the AI Era',
    excerpt: 'How we developed a standardized color palette that speaks to both humans and the AI agents that power our platform.',
    date: 'April 14, 2026',
    author: 'Design Team',
    category: 'Product',
    tags: ['Design', 'AI', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>Visual identity in 2026 isn't just about looking good to human eyes—it's about being legible to the AI vision models that are increasingly part of our workflows.</p>
      
      <h2>The Agent-First Palette</h2>
      <p>We've introduced a standardized color system designed for "digital precision." Using <strong>Emerald-500</strong> for our primary actions and <strong>Cyan-500</strong> for accents, we've created a look that feels intelligent, efficient, and modern.</p>
      
      <h2>Why Legibility is Key</h2>
      <p>Our "Agent-First" philosophy extends to our UI. Our colors are chosen for:</p>
      <ul>
        <li><strong>High Contrast:</strong> Exceeding WCAG 2.1 AA+ standards ensures accessibility for everyone and better parsing for AI agents.</li>
        <li><strong>Logical Naming:</strong> We use functional names like <code>surface</code>, <code>border</code>, and <code>primary</code> to ensure our code remains self-documenting.</li>
        <li><strong>Digital Resonance:</strong> Our palette evokes the feeling of a high-performance terminal, combined with the approachability of a modern SaaS.</li>
      </ul>
      
      <p>Whether you're a developer looking at our dashboard or an investor reviewing our metrics, the FizzBuzz Scalable identity represents our commitment to clarity and precision.</p>
    `
  },
  {
    id: 'solving-node-25-corepack',
<<<<<<< HEAD
    title: 'Lessons from the Edge: Solving the Node 25 Corepack Mystery',
    excerpt: 'Read about how our culture of transparency and rigorous case studies helps us build more resilient systems.',
=======
    title: 'The Transparency Edge: Turning a "Breaking" Update into an Engineering Masterclass',
    excerpt: 'When Node.js 24 broke our builds, we didn\'t just fix it—we documented it for the world. Discover how our culture of radical transparency builds more resilient systems and unbreakable trust.',
>>>>>>> feature/node-24-lts-alignment
    date: 'April 15, 2026',
    author: 'Operations Team',
    category: 'Company',
    tags: ['Case Study', 'DevOps', 'Stability'],
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800',
    content: `
      <p>At FizzBuzz Scalable, we don't hide our mistakes—we learn from them. Last week, we encountered a fascinating challenge when upgrading to Node.js 25: the disappearance of Corepack.</p>
      
<<<<<<< HEAD
      <h2>The Incident</h2>
      <p>Our Docker builds suddenly began failing with a cryptic <code>corepack: not found</code> error. While many teams would have simply reverted to an older version, we chose to dig deep.</p>
=======
      <h2>The Incident: Node.js 24 vs. The World</h2>
      <p>The transition to Node.js 24 introduced a significant shift: the unbundling of Corepack. For teams using minimalist, high-security <code>slim</code> Docker images, this was a breaking change. While others scrambled to downgrade, we chose to lead.</p>
>>>>>>> feature/node-24-lts-alignment
      
      <h2>The Root Cause</h2>
      <p>Node.js 25 made the strategic decision to unbundle Corepack. In the minimalist <code>slim</code> images we use for maximum security and speed, this meant we needed a new approach to enabling <code>pnpm</code>.</p>
      
      <h2>Our Culture of Transparency</h2>
      <p>Within hours, we had a full case study documented. We didn't just fix the builds; we updated our documentation and shared the findings across the team. This culture of transparency is why:</p>
      <ul>
        <li><strong>Our uptime is industry-leading.</strong></li>
        <li><strong>Our engineers grow faster.</strong></li>
        <li><strong>Our customers trust us with their mission-critical logic.</strong></li>
      </ul>
      
      <p>We're looking for engineers who love solving puzzles and a company that values the "why" as much as the "how." If that's you, check out our careers page.</p>
    `
  }
];
