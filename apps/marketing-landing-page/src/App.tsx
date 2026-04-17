import { useState } from 'react';
import { Button, Badge, Card, CardContent } from '@fizzbuzz/ui';
import { motion, AnimatePresence } from 'framer-motion';
import { FizzBuzzChat } from './components/FizzBuzzChat';
import { blogPosts } from './data/blogPosts';
import { docPages } from './data/docs';
import { caseStudies, CaseStudy } from './data/caseStudies';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
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
  X,
  BarChart,
  Calendar,
  User,
  Tag,
  ArrowLeft,
} from 'lucide-react';

interface ComingSoonModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
}

const ComingSoonModal = ({ isModalOpen, closeModal }: ComingSoonModalProps) => (
  <AnimatePresence>
    {isModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          role="dialog"
          aria-modal="true"
          className="relative bg-surface border border-border p-8 rounded-3xl shadow-2xl max-w-md w-full"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-8">
              We&apos;re putting the finishing touches on this feature. Join our waitlist to be the first to know when we launch!
            </p>
            <Button onClick={closeModal} className="w-full rounded-xl py-6">
              Got it
            </Button>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const CaseStudyModal = ({ study, closeModal }: { study: CaseStudy | undefined; closeModal: () => void }) => (
  <AnimatePresence>
    {study && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          role="dialog"
          aria-label="Case Study"
          className="relative bg-surface border border-border rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10 p-2 bg-surface/80 rounded-full backdrop-blur-sm"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="p-8 md:p-12">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <Badge variant="secondary" className="px-4 py-1.5">{study.industry}</Badge>
                <span className="text-primary font-bold">{study.stats}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
                {study.title}
              </h1>
              <p className="text-2xl text-muted-foreground">
                {study.company}
              </p>
            </header>

            <div className="prose prose-slate prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {study.content}
              </ReactMarkdown>
            </div>
            
            <footer className="mt-12 pt-8 border-t border-border">
              <Button onClick={closeModal} className="rounded-xl px-8">
                Close Case Study
              </Button>
            </footer>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'case-studies' | 'docs' | 'blog'>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string>('introduction');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const selectedPost = blogPosts.find(p => p.id === selectedPostId);
  const selectedCaseStudy = caseStudies.find(s => s.id === selectedCaseStudyId);

  if (activeSection === 'case-studies') {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Terminal className="text-primary-foreground w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">
                  FizzBuzz <span className="text-primary">Scalable</span>
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setActiveSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setActiveSection('blog')}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Blog
                </button>
                <Button variant="primary" size="md" className="rounded-full shadow-lg shadow-primary/30 px-6 py-2" onClick={openModal}>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <header className="py-24 bg-surface/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1">
              Success Stories
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">
              Enterprise <span className="text-primary">Case Studies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how world-leading organizations are scaling their algorithmic operations with FizzBuzz Scalable.
            </p>
          </div>
        </header>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {caseStudies.map((study, i) => {
                const IconComponent = {
                  BarChart,
                  Rocket,
                  Microscope,
                  Zap
                }[study.icon] || BarChart;

                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden hover:border-primary/50 transition-colors group">
                      <CardContent className="p-0">
                        <div className="flex flex-col h-full">
                          <div className="bg-surface/50 p-8 border-b border-border group-hover:bg-primary/5 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                              <div className="w-12 h-12 bg-background border border-border rounded-xl flex items-center justify-center">
                                <IconComponent className={`w-8 h-8 ${
                                  study.icon === 'BarChart' ? 'text-primary' :
                                  study.icon === 'Rocket' ? 'text-secondary' :
                                  study.icon === 'Microscope' ? 'text-accent' :
                                  'text-primary'
                                }`} />
                              </div>
                              <Badge variant="outline">{study.industry}</Badge>
                            </div>
                            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {study.company}
                            </h3>
                            <div className="text-primary font-bold text-lg mb-4">
                              {study.stats}
                            </div>
                          </div>
                          <div className="p-8">
                            <h4 className="text-xl font-semibold mb-4">{study.title}</h4>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                              {study.desc}
                            </p>
                            <Button 
                              variant="outline" 
                              className="rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all" 
                              onClick={() => setSelectedCaseStudyId(study.id)}
                            >
                              Read Full Case Study
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Ready to be our next success story?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button variant="secondary" size="lg" className="rounded-2xl px-10 py-8 text-xl bg-white text-primary hover:bg-slate-100" onClick={openModal}>
                Coming Soon
              </Button>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 py-8 text-xl border-2 border-white text-white hover:bg-white/10" onClick={openModal}>
                Coming Soon
              </Button>
            </div>
          </div>
        </section>
        
        <ComingSoonModal isModalOpen={isModalOpen} closeModal={closeModal} />
        <CaseStudyModal 
          study={selectedCaseStudy} 
          closeModal={() => setSelectedCaseStudyId(null)} 
        />
        <FizzBuzzChat />
      </div>
    );
  }

  if (activeSection === 'blog') {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button 
                onClick={() => {
                  setActiveSection('home');
                  setSelectedPostId(null);
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Terminal className="text-primary-foreground w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">
                  FizzBuzz <span className="text-primary">Scalable</span>
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => {
                    setActiveSection('home');
                    setSelectedPostId(null);
                  }}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => {
                    setActiveSection('blog');
                    setSelectedPostId(null);
                  }}
                  className={`${!selectedPostId ? 'text-primary' : 'text-muted-foreground'} hover:text-primary transition-colors font-medium`}
                >
                  Blog
                </button>
                <Button variant="primary" size="md" className="rounded-full shadow-lg shadow-primary/30 px-6 py-2" onClick={openModal}>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            {!selectedPostId ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <header className="mb-16 text-center">
                  <Badge variant="secondary" className="mb-4 px-4 py-1.5">Company Blog</Badge>
                  <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter mb-6">
                    Inside <span className="text-primary">FizzBuzz Scalable</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Engineering excellence, product innovation, and our journey to build the gold standard for enterprise logic.
                  </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="overflow-hidden hover:border-primary/50 transition-all cursor-pointer group flex flex-col"
                      onClick={() => setSelectedPostId(post.id)}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-8 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                            {post.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-primary font-bold gap-2">
                          Read More <ArrowLeft className="w-4 h-4 rotate-180" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="post"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <button 
                  onClick={() => setSelectedPostId(null)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to all posts
                </button>

                {selectedPost && (
                  <article>
                    <header className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                        <Badge variant="secondary">{selectedPost.category}</Badge>
                        <span className="text-muted-foreground flex items-center gap-1 text-sm">
                          <Calendar className="w-4 h-4" />
                          {selectedPost.date}
                        </span>
                        <span className="text-muted-foreground flex items-center gap-1 text-sm">
                          <User className="w-4 h-4" />
                          {selectedPost.author}
                        </span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                        {selectedPost.title}
                      </h1>
                      <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
                        <img 
                          src={selectedPost.image} 
                          alt={selectedPost.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </header>
                    <div className="prose prose-slate prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-3xl">
                      {selectedPost.isMarkdown ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedPost.content}</ReactMarkdown>
                      ) : (
                        <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                      )}
                    </div>
                    <footer className="mt-16 pt-8 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map(tag => (
                          <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-surface border border-border rounded-full text-xs text-muted-foreground">
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </footer>
                  </article>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <ComingSoonModal isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
    );
  }

  if (activeSection === 'docs') {
    const selectedDoc = docPages.find(p => p.id === selectedDocId) || docPages[0];
    const categories = ['Getting Started', 'Core Concepts', 'API Reference', 'Legal'] as const;

    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Terminal className="text-primary-foreground w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight">
                  FizzBuzz <span className="text-primary">Scalable</span>
                </span>
              </button>
              <div className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setActiveSection('home')}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => setActiveSection('blog')}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  Blog
                </button>
                <Button variant="primary" size="md" className="rounded-full shadow-lg shadow-primary/30 px-6 py-2" onClick={openModal}>
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row gap-12">
            <aside className="md:w-64 space-y-8">
              {categories.map(category => (
                <div key={category}>
                  <h3 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-4">{category}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {docPages
                      .filter(p => p.category === category)
                      .map(page => (
                        <li 
                          key={page.id}
                          onClick={() => setSelectedDocId(page.id)}
                          className={`hover:text-primary cursor-pointer transition-colors ${selectedDocId === page.id ? 'text-primary font-bold' : ''}`}
                        >
                          {page.title}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </aside>
            <main className="flex-1 max-w-3xl">
              <Badge variant="secondary" className="mb-4">Documentation</Badge>
              <div className="prose prose-slate prose-invert max-w-none">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node: _node, ...props }) => {
                      const href = props.href || '';
                      if (href.startsWith('http')) {
                        return <a {...props} target="_blank" rel="noopener noreferrer" />;
                      }
                      return (
                        <a 
                          {...props} 
                          onClick={(e) => {
                            e.preventDefault();
                            const id = href.replace('.md', '').toLowerCase();
                            if (docPages.find(p => p.id === id)) {
                              setSelectedDocId(id);
                            }
                          }}
                        />
                      );
                    }
                  }}
                >
                  {selectedDoc.content}
                </ReactMarkdown>

                {selectedDocId === 'introduction' && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
                    <div className="grid sm:grid-cols-2 gap-4 not-prose">
                      <div className="p-6 border border-border rounded-2xl hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedDocId('installation')}>
                        <h3 className="font-bold mb-2">Installation Guide</h3>
                        <p className="text-sm text-muted-foreground">Get the FizzBuzz engine running in minutes.</p>
                      </div>
                      <div className="p-6 border border-border rounded-2xl hover:border-primary transition-colors cursor-pointer" onClick={() => setSelectedDocId('endpoints')}>
                        <h3 className="font-bold mb-2">API Reference</h3>
                        <p className="text-sm text-muted-foreground">Integrate our logic directly into your apps.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
        <ComingSoonModal isModalOpen={isModalOpen} closeModal={closeModal} />
        <FizzBuzzChat />
      </div>
    );
  }

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
              <button
                onClick={() => setActiveSection('case-studies')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Case Studies
              </button>
              <button
                onClick={() => setActiveSection('blog')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Blog
              </button>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </a>
              <button
                onClick={() => setActiveSection('docs')}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                Docs
              </button>
              <Button variant="primary" size="md" className="rounded-full shadow-lg shadow-primary/30 px-6 py-2" onClick={openModal}>
                Coming Soon
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
              v24.14.1 Engine • Enterprise Grade
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
                onClick={openModal}
                className="rounded-2xl px-10 py-8 text-xl shadow-2xl shadow-primary/25 bg-primary hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center gap-3"
              >
                <Rocket className="h-6 w-6" />
                <span>Start Free Trial</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={openModal}
                className="rounded-2xl px-10 py-8 text-xl border-2 hover:bg-surface transition-all flex items-center justify-center gap-3"
              >
                <Terminal className="h-6 w-6" />
                <span>Schedule Demo</span>
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
                <CardContent className="p-8 pt-8">
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
                <CardContent className="p-8 pt-8">
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
              <Badge variant="primary" className="mb-4 px-4 py-1.5">
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
                cta: 'Coming Soon',
                variant: 'outline' as const,
              },
              {
                name: 'Professional',
                price: '$499',
                desc: 'For growing teams and startups.',
                features: ['Cloud orchestration', 'Priority email support', 'Advanced analytics', 'Custom plugins'],
                cta: 'Coming Soon',
                variant: 'primary' as const,
                popular: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                desc: 'Mission-critical deployments.',
                features: ['Dedicated support engineer', 'SLA guarantees', 'SOC2/HIPAA compliance', 'Unlimited nodes'],
                cta: 'Coming Soon',
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
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground border-none px-4 py-1.5">
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
                <Button variant={plan.variant} className="w-full rounded-xl py-6" onClick={openModal}>
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
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Twitter
              </a>
              <a
                href="https://github.com/CamJohnson26/agent-first-fizzbuzz-scalable"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('docs');
                }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Documentation
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('blog');
                  setSelectedPostId(null);
                }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Blog
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('docs');
                  setSelectedDocId('privacy');
                }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection('docs');
                  setSelectedDocId('terms');
                }}
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ComingSoonModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <FizzBuzzChat />
    </div>
  );
}
