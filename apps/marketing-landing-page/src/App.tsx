export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FB</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">FizzBuzz Scalable</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-600 hover:text-indigo-600 transition-colors">Use Cases</a>
              <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 transition-all shadow-sm">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              The Enterprise Standard for <br />
              <span className="text-indigo-600">Algorithmic Excellence</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Redefining FizzBuzz for the 21st century. Scalable, high-fidelity, and AI-first solutions for academic and industrial research.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                Deploy Now
              </button>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-all">
                Read Documentation
              </button>
            </div>
          </div>
          
          {/* Abstract background element */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
        </div>
      </header>

      {/* Stats/Proof */}
      <section className="py-12 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-indigo-100 opacity-80">AI-Written</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">∞</div>
              <div className="text-indigo-100 opacity-80">Scalability</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">v25.9</div>
              <div className="text-indigo-100 opacity-80">Node.js Engine</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-1">0ms</div>
              <div className="text-indigo-100 opacity-80">Latency Optimized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose FizzBuzz Scalable?</h2>
            <p className="mt-4 text-xl text-gray-600">The most advanced implementation of the world's most famous algorithm.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Extreme Performance</h3>
              <p className="text-gray-600">Optimized for high-throughput processing across distributed clusters.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">High Fidelity</h3>
              <p className="text-gray-600">100% precision in modular logic, verified by enterprise-grade test suites.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:text-indigo-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Research Ready</h3>
              <p className="text-gray-600">Designed for academia to explore cutting-edge implementation options.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section id="use-cases" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Mission-Critical Fields</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
                    <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 w-full aspect-square bg-indigo-600 rounded-3xl shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 to-transparent z-10" />
              <div className="p-12 h-full flex flex-col justify-end text-white relative z-20">
                <div className="text-6xl font-serif italic mb-4">"</div>
                <p className="text-2xl font-medium leading-tight mb-6">
                  Finally, a FizzBuzz solution that matches the scale of our global research efforts.
                </p>
                <div className="font-bold">Dr. Algernon Fizz</div>
                <div className="text-indigo-200">Head of Algorithmic Studies, FB University</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">FB</span>
              </div>
              <span className="font-bold text-gray-900">FizzBuzz Scalable</span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; 2026 FizzBuzz Scalable. All rights reserved. Enterprise Proprietary.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-600">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-gray-600">GitHub</a>
              <a href="#" className="text-gray-400 hover:text-gray-600">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
