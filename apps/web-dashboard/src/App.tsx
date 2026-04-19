import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Activity,
  Calculator,
  List,
  RefreshCw,
  Terminal,
  Bot,
  CheckCircle,
  XCircle,
  CheckCircle2,
  Download,
  Home,
  FileJson,
  FileText,
  FileSpreadsheet,
  FileType,
  Columns,
  Rows,
} from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Badge,
  Alert,
  AlertTitle,
  AlertDescription,
  cn,
} from '@fizzbuzz/ui';
import { NPSFeedback } from './components/NPSFeedback';
import { TipOfTheDay } from './components/TipOfTheDay';
import { 
  HealthResponse, 
  ComputeResponse, 
  RangeResponse, 
  AnalyticsStats, 
  FizzBuzzEngine 
} from '@fizzbuzz/types';
import { exportResults, ExportFormat, ExportOrientation } from './utils/export';
import { FizzBuzzChat } from './components/FizzBuzzChat';

const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE) || '/api';
const ANALYTICS_BASE = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANALYTICS_BASE) || '/analytics';

export default function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [computeValue, setComputeValue] = useState<number>(15);
  const [computeResult, setComputeResult] = useState<string | null>(null);
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(15);
  const [rangeResults, setRangeResults] = useState<string[]>([]);
  const [engine, setEngine] = useState<FizzBuzzEngine>('js');
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [computeCount, setComputeCount] = useState(0);
  const [showNPS, setShowNPS] = useState(false);
  const [npsFeedbackSent, setNpsFeedbackSent] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [exportOrientation, setExportOrientation] = useState<ExportOrientation>('vertical');

  const handleNPSSubmit = async (score: number, comment: string) => {
    setShowNPS(false);
    try {
      await fetch(`${ANALYTICS_BASE}/api/logs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'web-dashboard',
          message: 'NPS Submission',
          level: 'info',
          metadata: { score, comment },
        }),
      });
      setNpsFeedbackSent(true);
      setTimeout(() => setNpsFeedbackSent(false), 5000);
    } catch (_err) {
      console.error('Failed to submit NPS:', _err);
    }
  };

  const handleNPSDismiss = () => {
    setShowNPS(false);
  };

  const checkHealth = useCallback(async () => {
    setLoadingHealth(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/health`);
      const data = (await res.json()) as HealthResponse;
      setHealth(data);
    } catch (_err) {
      console.error('Failed to fetch health:', _err);
      if (_err instanceof Error) {
        console.error('Error details:', {
          message: _err.message,
          name: _err.name,
          stack: _err.stack
        });
      }
      setHealth({ status: 'offline', timestamp: new Date().toISOString() });
    } finally {
      setLoadingHealth(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${ANALYTICS_BASE}/stats`);
      const data = (await res.json()) as AnalyticsStats;
      setStats(data);
    } catch (_err) {
      console.error('Failed to fetch stats:', _err);
    }
  }, []);

  useEffect(() => {
    console.log('[Dashboard] API_BASE:', API_BASE);
    console.log('[Dashboard] ANALYTICS_BASE:', ANALYTICS_BASE);
    checkHealth();
    fetchStats();
    setShowNPS(true);
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [checkHealth, fetchStats]);

  const handleCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/compute/${computeValue}?engine=${engine}`);
      const data = (await res.json()) as ComputeResponse & { error?: string };
      if (res.ok) {
        setComputeResult(data.result);
        const nextCount = computeCount + 1;
        setComputeCount(nextCount);
      } else {
        setError(data.error || 'Failed to compute');
        setComputeResult(null);
      }
    } catch (_err) {
      setError('Connection refused. Is the web-server running?');
      setComputeResult(null);
    }
  };

  const handleRangeCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/range?start=${rangeStart}&end=${rangeEnd}&engine=${engine}`);
      const data = (await res.json()) as RangeResponse & { error?: string | unknown[] };
      if (res.ok) {
        setRangeResults(data.results);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00ff00', '#0000ff', '#ff00ff', '#ffff00', '#00ffff']
        });
      } else {
        setError(
          Array.isArray(data.error)
            ? (data.error[0] as { message: string }).message
            : data.error || 'Failed to compute range',
        );
        setRangeResults([]);
      }
    } catch (_err) {
      setError('Connection refused. Is the web-server running?');
      setRangeResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <header className="bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-105">
              <Terminal className="text-primary-foreground w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              FizzBuzz <span className="text-primary">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <TipOfTheDay />
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/'}
              className="gap-2 rounded-lg"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Marketing</span>
            </Button>
            <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1.5 rounded-lg">
              <label htmlFor="engine-select" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Engine:</label>
              <select 
                id="engine-select"
                value={engine}
                onChange={(e) => setEngine(e.target.value as FizzBuzzEngine)}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="js">JavaScript (Standard)</option>
                <option value="rust">Rust (Lightning Fast)</option>
                <option value="lean">Lean (Formal Verification)</option>
              </select>
            </div>
            <Badge 
              variant={health?.status === 'ok' ? 'success' : 'error'}
              className="px-3 py-1 gap-1.5"
            >
              {health?.status === 'ok' ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5" />
              )}
              Server: {health?.status || 'checking...'}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={checkHealth}
              disabled={loadingHealth}
              className="h-9 w-9 p-0 rounded-lg flex items-center justify-center"
            >
              <RefreshCw
                className={`w-5 h-5 ${loadingHealth ? 'animate-spin' : ''}`}
              />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-8">
            <XCircle className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {npsFeedbackSent && (
          <Alert variant="default" className="mb-8 bg-primary/10 border-primary/20">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <AlertTitle>Feedback Received</AlertTitle>
            <AlertDescription>
              Thank you for helping us make FizzBuzz more enterprise-ready!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Health Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">System Status</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Status
                </label>
                <p className="font-semibold capitalize text-foreground">
                  {health?.status || 'Unknown'}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Last Checked
                </label>
                <p className="text-sm font-mono text-foreground">
                  {health?.timestamp
                    ? new Date(health.timestamp).toLocaleString()
                    : 'Never'}
                </p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Dashboard connected to{' '}
                  <code className="bg-muted px-1 rounded text-accent">
                    {' '}
                    {API_BASE}{' '}
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 text-accent rounded-lg">
                  <Activity className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Live Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground block mb-1">
                  Total Logs
                </label>
                <p className="text-2xl font-black text-foreground">
                  {stats?.totalLogs ?? '0'}
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground block">
                  Logs by Service
                </label>
                {stats &&
                  Object.entries(stats.logsByService).map(([service, count]) => (
                    <div
                      key={service}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-mono text-muted-foreground">
                        {service}
                      </span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Compute Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                  <Calculator className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Single Computation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm text-muted-foreground block mb-2">
                    Input Number (n)
                  </label>
                  <Input
                    type="number"
                    value={computeValue}
                    onChange={(e) => setComputeValue(parseInt(e.target.value))}
                    placeholder="Enter a number..."
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleCompute} className="w-full sm:w-auto">
                    Compute
                  </Button>
                </div>
              </div>
              {computeResult && (
                <div className="p-6 bg-primary/5 rounded-xl border border-primary/20 flex items-center justify-between">
                  <span className="text-muted-foreground font-medium">
                    Result:
                  </span>
                  <span data-testid="single-result" className="text-3xl font-black text-primary animate-in zoom-in-50 duration-300">
                    {computeResult}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Range Card */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 text-accent rounded-lg">
                  <List className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">Range Computation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    Start
                  </label>
                  <Input
                    type="number"
                    value={rangeStart}
                    onChange={(e) => setRangeStart(parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    End
                  </label>
                  <Input
                    type="number"
                    value={rangeEnd}
                    onChange={(e) => setRangeEnd(parseInt(e.target.value))}
                  />
                </div>
                <div className="sm:col-span-2 flex items-end">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleRangeCompute}
                    className="w-full shadow-lg shadow-primary/20 font-bold tracking-wide gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Generate Range Results
                  </Button>
                </div>
              </div>

              {rangeResults.length > 0 && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Format:</span>
                        <div className="flex bg-surface rounded-lg border border-border p-1">
                          {[
                            { id: 'csv', icon: FileType, label: 'CSV' },
                            { id: 'json', icon: FileJson, label: 'JSON' },
                            { id: 'pdf', icon: FileText, label: 'PDF' },
                            { id: 'txt', icon: FileText, label: 'TXT' },
                            { id: 'excel', icon: FileSpreadsheet, label: 'Excel' },
                          ].map((f) => (
                            <button
                              key={f.id}
                              onClick={() => setExportFormat(f.id as ExportFormat)}
                              className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
                                exportFormat === f.id 
                                  ? "bg-primary text-primary-foreground shadow-sm" 
                                  : "hover:bg-muted text-muted-foreground"
                              )}
                              title={f.label}
                            >
                              <f.icon className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{f.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Layout:</span>
                        <div className="flex bg-surface rounded-lg border border-border p-1">
                          {[
                            { id: 'vertical', icon: Columns, label: 'Vertical' },
                            { id: 'horizontal', icon: Rows, label: 'Horizontal' },
                          ].map((o) => (
                            <button
                              key={o.id}
                              onClick={() => setExportOrientation(o.id as ExportOrientation)}
                              className={cn(
                                "px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5",
                                exportOrientation === o.id 
                                  ? "bg-accent text-accent-foreground shadow-sm" 
                                  : "hover:bg-muted text-muted-foreground"
                              )}
                              title={o.label}
                            >
                              <o.icon className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{o.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => exportResults(rangeResults, rangeStart, exportFormat, exportOrientation)}
                      variant="outline"
                      className="w-full md:w-auto bg-surface gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Export Results
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {rangeResults.map((res, i) => (
                      <Badge
                        key={i}
                        variant={
                          res === 'Fizz'
                            ? 'warning'
                            : res === 'Buzz'
                              ? 'secondary'
                              : res === 'FizzBuzz'
                                ? 'primary'
                                : 'outline'
                        }
                        className="justify-center py-2 text-sm shadow-sm hover:scale-105 transition-transform"
                      >
                        <span className="text-xs opacity-50 mr-1.5 font-mono">{rangeStart + i}</span>
                        <span data-testid="result-text">{res}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Section */}
        <section className="mt-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Bot className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">FizzBuzz AI Assistant</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FizzBuzzChat apiBase={API_BASE} />
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    About the Model
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                    This assistant is powered by a custom-trained lightweight Transformer model (~0.8M parameters).
                  </p>
                  <p>
                    It was trained specifically on FizzBuzz chat datasets to understand user queries and provide step-by-step reasoning.
                  </p>
                  <div className="bg-muted p-3 rounded-md font-mono text-xs">
                    Architecture: Decoder-only Transformer<br/>
                    Embeddings: 128<br/>
                    Layers: 4<br/>
                    Heads: 4
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-muted-foreground text-sm border-t border-border mt-12">
        <p>© 2026 FizzBuzz Scalable Enterprise. All Rights Reserved.</p>
      </footer>

      {showNPS && (
        <NPSFeedback onSubmit={handleNPSSubmit} onDismiss={handleNPSDismiss} />
      )}
    </div>
  );
}
