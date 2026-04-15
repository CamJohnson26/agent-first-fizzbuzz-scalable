import { useState, useEffect } from 'react';
import { Activity, Calculator, List, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [health, setHealth] = useState<{ status: string; timestamp: string } | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [computeValue, setComputeValue] = useState<number>(15);
  const [computeResult, setComputeResult] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(15);
  const [rangeResults, setRangeResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = 'http://localhost:3000'; // Default web-server port

  const checkHealth = async () => {
    setLoadingHealth(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/health`);
      const data = await res.json();
      setHealth(data);
    } catch (err) {
      console.error('Failed to fetch health:', err);
      setHealth({ status: 'offline', timestamp: new Date().toISOString() });
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const handleCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/compute/${computeValue}`);
      const data = await res.json();
      if (res.ok) {
        setComputeResult(data.result);
      } else {
        setError(data.error || 'Failed to compute');
      }
    } catch {
      setError('Connection refused. Is the web-server running?');
    }
  };

  const handleRangeCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/range?start=${rangeStart}&end=${rangeEnd}`);
      const data = await res.json();
      if (res.ok) {
        setRangeResults(data.results);
      } else {
        setError(Array.isArray(data.error) ? data.error[0].message : data.error || 'Failed to compute range');
      }
    } catch {
      setError('Connection refused. Is the web-server running?');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-100 shadow-lg">
              <Calculator className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">FizzBuzz <span className="text-indigo-600">Dashboard</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
              health?.status === 'ok' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}>
              {health?.status === 'ok' ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              Server: {health?.status || 'checking...'}
            </div>
            <button 
              onClick={checkHealth}
              disabled={loadingHealth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={cn("w-5 h-5 text-gray-500", loadingHealth && "animate-spin")} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">System Status</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Status</label>
                <p className="font-semibold capitalize">{health?.status || 'Unknown'}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Last Checked</label>
                <p className="text-sm font-mono">{health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'Never'}</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Dashboard connected to <code className="bg-gray-100 px-1 rounded">{API_BASE}</code>
                </p>
              </div>
            </div>
          </div>

          {/* Compute Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">Single Computation</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-gray-500 block mb-2">Input Number (n)</label>
                <input 
                  type="number" 
                  value={computeValue}
                  onChange={(e) => setComputeValue(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter a number..."
                />
              </div>
              <div className="flex items-end">
                <button 
                  onClick={handleCompute}
                  className="w-full sm:w-auto px-8 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                  Compute
                </button>
              </div>
            </div>
            {computeResult && (
              <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <span className="text-emerald-800 font-medium">Result:</span>
                <span className="text-2xl font-black text-emerald-600">{computeResult}</span>
              </div>
            )}
          </div>

          {/* Range Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <List className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold">Range Computation</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
              <div>
                <label className="text-sm text-gray-500 block mb-2">Start</label>
                <input 
                  type="number" 
                  value={rangeStart}
                  onChange={(e) => setRangeStart(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-2">End</label>
                <input 
                  type="number" 
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="sm:col-span-2 flex items-end">
                <button 
                  onClick={handleRangeCompute}
                  className="w-full px-8 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                  Generate Range Results
                </button>
              </div>
            </div>

            {rangeResults.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {rangeResults.map((res, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "p-3 rounded-lg text-center font-bold text-sm shadow-sm transition-all hover:scale-105",
                      res === 'Fizz' ? "bg-amber-100 text-amber-700 border border-amber-200" :
                      res === 'Buzz' ? "bg-blue-100 text-blue-700 border border-blue-200" :
                      res === 'FizzBuzz' ? "bg-indigo-600 text-white ring-4 ring-indigo-100" :
                      "bg-gray-50 text-gray-600 border border-gray-100"
                    )}
                  >
                    {res}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-400 text-sm">
        <p>© 2026 FizzBuzz Scalable Enterprise. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
