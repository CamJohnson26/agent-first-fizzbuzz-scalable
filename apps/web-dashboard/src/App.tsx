import { useState, useEffect } from 'react';
import {
  Activity,
  Calculator,
  List,
  RefreshCw,
  Terminal,
  CheckCircle,
  XCircle,
  CheckCircle2,
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
} from '@fizzbuzz/ui';
import { NPSFeedback } from './components/NPSFeedback.js';
import { 
  HealthResponse, 
  ComputeResponse, 
  RangeResponse, 
  AnalyticsStats, 
  FizzBuzzEngine 
} from '@fizzbuzz/types';

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
  const [hasSubmittedNPS, setHasSubmittedNPS] = useState(false);
  const [npsFeedbackSent, setNpsFeedbackSent] = useState(false);

  const API_BASE = 'http://localhost:3000';
  const ANALYTICS_BASE = 'http://localhost:3001';

  const handleNPSSubmit = async (score: number, comment: string) => {
    setShowNPS(false);
    setHasSubmittedNPS(true);
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

  const checkHealth = async () => {
    setLoadingHealth(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/health`);
      const data = (await res.json()) as HealthResponse;
      setHealth(data);
    } catch (_err) {
      console.error('Failed to fetch health:', _err);
      setHealth({ status: 'offline', timestamp: new Date().toISOString() });
    } finally {
      setLoadingHealth(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${ANALYTICS_BASE}/stats`);
      const data = (await res.json()) as AnalyticsStats;
      setStats(data);
    } catch (_err) {
      console.error('Failed to fetch stats:', _err);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/compute/${computeValue}?engine=${engine}`);
      const data = (await res.json()) as ComputeResponse & { error?: string };
      if (res.ok) {
        setComputeResult(data.result);
        const nextCount = computeCount + 1;
        setComputeCount(nextCount);
        if (nextCount >= 3 && !hasSubmittedNPS) {
          setShowNPS(true);
        }
      } else {
        setError(data.error || 'Failed to compute');
      }
    } catch (_err) {
      setError('Connection refused. Is the web-server running?');
    }
  };

  const handleRangeCompute = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/range?start=${rangeStart}&end=${rangeEnd}&engine=${engine}`);
      const data = (await res.json()) as RangeResponse & { error?: string | unknown[] };
      if (res.ok) {
        setRangeResults(data.results);
      } else {
        setError(
          Array.isArray(data.error)
            ? (data.error[0] as { message: string }).message
            : data.error || 'Failed to compute range',
        );
      }
    } catch (_err) {
      setError('Connection refused. Is the web-server running?');
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
              className="p-2 rounded-lg"
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
                  <span className="text-3xl font-black text-primary animate-in zoom-in-50 duration-300">
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
                    variant="secondary"
                    onClick={handleRangeCompute}
                    className="w-full"
                  >
                    Generate Range Results
                  </Button>
                </div>
              </div>

              {rangeResults.length > 0 && (
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
                      {res}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
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
