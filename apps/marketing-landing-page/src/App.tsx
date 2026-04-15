import { Button, Badge, Card, CardContent } from '@fizzbuzz/ui';
import { motion } from 'framer-motion';
import {
  Rocket,
  ShieldCheck,
  Microscope,
  Terminal,
  Cpu,
  Zap,
  Globe,
  CheckCircle2,
  Lock,
  Workflow,
  Server,
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Terminal className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-foreground tracking-tight">
                FizzBuzz <span className="text-primary">Scalable</span>
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#use-cases"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Company
              </a>
              <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-primary/30">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1">
              v25.9.0 Engine • Enterprise Grade
            </Badge>
            <h1 className="text-6xl md:text-8xl font-extrabold text-foreground tracking-tighter mb-8 leading-[1.1]">
              The Gold Standard for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-secondary">
                Enterprise Logic
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Scale your algorithmic operations with 100% fidelity. Built for mission-critical
              enterprise systems requiring zero-latency, high-throughput FizzBuzz orchestration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                className="rounded-2xl px-10 py-8 text-xl shadow-2xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105"
              >
                <Rocket className="mr-3 h-6 w-6" />
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-2xl px-10 py-8 text-xl border-2 hover:bg-surface transition-all"
              >
                <Terminal className="mr-3 h-6 w-6" />
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />
      </header>

      {/* Stats/Proof */}
      <section className="py-24 bg-surface/30 border-y border-border backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-8">
              Trusted by Industry Leaders
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
              {['TechFlow', 'Algosys', 'DataScalr', 'Nodex'].map((brand) => (
                <div key={brand} className="flex items-center gap-2 text-2xl font-bold">
                  <Cpu className="w-8 h-8 text-primary" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-12 border-t border-border/50">
            {[
              {
                label: 'AI-Written',
                value: '100%',
                icon: <Cpu className="w-5 h-5 mx-auto mb-2 text-primary" />,
              },
              {
                label: 'Scalability',
                value: '∞',
                icon: <Globe className="w-5 h-5 mx-auto mb-2 text-secondary" />,
              },
              {
                label: 'Node.js Engine',
                value: 'v25.9',
                icon: <Zap className="w-5 h-5 mx-auto mb-2 text-accent" />,
              },
              {
                label: 'Latency',
                value: '0ms',
                icon: (
                  <Terminal className="w-5 h-5 mx-auto mb-2 text-primary" />
                ),
              },
            ].map((stat, i) => (
              <div key={i} className="group">
                {stat.icon}
                <div className="text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose FizzBuzz Scalable?
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              The most advanced implementation of the world&apos;s most famous
              algorithm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-surface/50 border-border hover:border-primary/50 transition-all h-full group">
                <CardContent className="pt-8">
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-lg shadow-primary/10">
                    <Server className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Edge Orchestration
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Deploy FizzBuzz logic across distributed global nodes with 
                    unified control and sub-millisecond propagation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              <Card className="bg-surface/50 border-border hover:border-secondary/50 transition-all h-full group">
                <CardContent className="pt-8">
                  <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-secondary group-hover:text-secondary-foreground transition-all duration-300 shadow-lg shadow-secondary/10">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    SOC2 Compliance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Enterprise-ready security with end-to-end encryption and 
                    comprehensive audit logging for all operations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <Card className="bg-surface/50 border-border hover:border-accent/50 transition-all h-full group">
                <CardContent className="pt-8">
                  <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-lg shadow-accent/10">
                    <Workflow className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Advanced Pipelines
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Integrate seamlessly into existing CI/CD workflows with our 
                    robust API and native DevOps toolchain support.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section id="use-cases" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <Badge variant="primary" className="mb-4">
                Use Cases
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Built for Mission-Critical Fields
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                While others treat FizzBuzz as a toy, we treat it as the
                foundation of modern computing. Our platform serves the most
                demanding industries with absolute consistency.
              </p>
              <ul className="space-y-4">
                {[
                  { text: 'Global Banking & Financial Institutions', icon: <Globe className="w-5 h-5 text-primary" /> },
                  { text: 'Healthcare & Life Sciences Research', icon: <Microscope className="w-5 h-5 text-primary" /> },
                  { text: 'Defense & Aerospace Engineering', icon: <ShieldCheck className="w-5 h-5 text-primary" /> },
                  { text: 'E-commerce & High-Traffic Retail', icon: <Zap className="w-5 h-5 text-primary" /> },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-medium text-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 w-full aspect-square rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden relative group">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Phil_McGraw%2C_2025.jpg/250px-Phil_McGraw%2C_2025.jpg"
                alt="Dr. Algernon Fizz"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <div className="p-12 h-full flex flex-col justify-end text-white relative z-20">
                <div className="text-6xl font-serif italic mb-4 text-primary">&quot;</div>
                <p className="text-2xl font-bold leading-tight mb-6">
                  Finally, a FizzBuzz solution that matches the scale of our
                  global research efforts.
                </p>
                <div className="font-black text-xl">Dr. Algernon Fizz</div>
                <div className="text-primary font-bold uppercase tracking-wider text-sm">
                  Head of Algorithmic Studies, FB University
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Enterprise-Grade Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Predictable costs for unpredictable scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$0',
                desc: 'Perfect for individual researchers.',
                features: ['Local execution', 'Basic community support', 'v25.9 Engine access'],
                cta: 'Start Now',
                variant: 'outline' as const,
              },
              {
                name: 'Professional',
                price: '$499',
                desc: 'For growing teams and startups.',
                features: ['Cloud orchestration', 'Priority email support', 'Advanced analytics', 'Custom plugins'],
                cta: 'Get Started',
                variant: 'primary' as const,
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'Mission-critical deployments.',
                features: ['Dedicated support engineer', 'SLA guarantees', 'SOC2/HIPAA compliance', 'Unlimited nodes'],
                cta: 'Talk to Sales',
                variant: 'outline' as const,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className={`p-8 rounded-3xl border ${
                  plan.popular
                    ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10 relative'
                    : 'border-border bg-surface/50'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-none">
                    Most Popular
                  </Badge>
                )}
                <div className="text-xl font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-muted-foreground mb-8 text-sm">{plan.desc}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.variant} className="w-full rounded-xl py-6">
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-24 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                <Terminal className="text-background w-4 h-4" />
              </div>
              <span className="font-bold text-foreground">
                FizzBuzz <span className="text-primary">Scalable</span>
              </span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; 2026 FizzBuzz Scalable. All rights reserved. Agent-First &
              Scalable.
            </div>
            <div className="flex space-x-8">
              <a
                href="https://twitter.com/fizzbuzz_scalable"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="https://github.com/cameron/agent-first-fizzbuzz-scalable"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="#docs"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Documentation
              </a>
              <a
                href="#privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
