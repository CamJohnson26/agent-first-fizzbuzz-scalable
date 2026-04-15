import { Button, Badge, Card, CardContent } from '@fizzbuzz/ui';
import { Rocket, ShieldCheck, Microscope, Terminal, Cpu, Zap, Globe } from 'lucide-react';

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
              <span className="text-xl font-bold text-foreground tracking-tight">FizzBuzz <span className="text-primary">Scalable</span></span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#use-cases" className="text-muted-foreground hover:text-primary transition-colors">Use Cases</a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <Button variant="primary" size="sm" className="rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6">v25.9.0 Engine Ready</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6">
              The Enterprise Standard for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Algorithmic Excellence</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Redefining FizzBuzz for the 21st century. Scalable, high-fidelity, and AI-first solutions for academic and industrial research.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-xl px-8 py-6 text-lg shadow-lg shadow-primary/20">
                <Rocket className="mr-2 h-5 w-5" />
                Deploy Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl px-8 py-6 text-lg">
                Read Documentation
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10" />
      </header>

      {/* Stats/Proof */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'AI-Written', value: '100%', icon: <Cpu className="w-5 h-5 mx-auto mb-2 text-primary" /> },
              { label: 'Scalability', value: '∞', icon: <Globe className="w-5 h-5 mx-auto mb-2 text-secondary" /> },
              { label: 'Node.js Engine', value: 'v25.9', icon: <Zap className="w-5 h-5 mx-auto mb-2 text-accent" /> },
              { label: 'Latency', value: '0ms', icon: <Terminal className="w-5 h-5 mx-auto mb-2 text-primary" /> },
            ].map((stat, i) => (
              <div key={i} className="group">
                {stat.icon}
                <div className="text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{stat.value}</div>
                <div className="text-muted-foreground uppercase tracking-widest text-xs font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Why Choose FizzBuzz Scalable?</h2>
            <p className="mt-4 text-xl text-muted-foreground">The most advanced implementation of the world&apos;s most famous algorithm.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-surface/50 hover:bg-surface hover:border-primary/50 transition-all group">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Extreme Performance</h3>
                <p className="text-muted-foreground">Optimized for high-throughput processing across distributed clusters.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-surface/50 hover:bg-surface hover:border-secondary/50 transition-all group">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">High Fidelity</h3>
                <p className="text-muted-foreground">100% precision in modular logic, verified by enterprise-grade test suites.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-surface/50 hover:bg-surface hover:border-accent/50 transition-all group">
              <CardContent className="pt-8">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Microscope className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Research Ready</h3>
                <p className="text-muted-foreground">Designed for academia to explore cutting-edge implementation options.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section id="use-cases" className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <Badge variant="primary" className="mb-4">Use Cases</Badge>
              <h2 className="text-3xl font-bold text-foreground mb-6">Built for Mission-Critical Fields</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                While others treat FizzBuzz as a toy, we treat it as the foundation of modern computing. Our platform serves the most demanding industries with absolute consistency.
              </p>
              <ul className="space-y-4">
                {[
                  'Academia & Research Universities',
                  'Algorithm Enthusiasts & Optimizers',
                  'Defense & Aerospace Engineering',
                  'High-Performance Medical Systems'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 w-full aspect-square bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl shadow-primary/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] z-10" />
              <div className="p-12 h-full flex flex-col justify-end text-slate-950 relative z-20">
                <div className="text-6xl font-serif italic mb-4">&quot;</div>
                <p className="text-2xl font-bold leading-tight mb-6">
                  Finally, a FizzBuzz solution that matches the scale of our global research efforts.
                </p>
                <div className="font-black">Dr. Algernon Fizz</div>
                <div className="text-slate-900/70 font-bold uppercase tracking-wider text-sm">Head of Algorithmic Studies, FB University</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground rounded flex items-center justify-center">
                <Terminal className="text-background w-4 h-4" />
              </div>
              <span className="font-bold text-foreground">FizzBuzz <span className="text-primary">Scalable</span></span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; 2026 FizzBuzz Scalable. All rights reserved. Agent-First & Scalable.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
