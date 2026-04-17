export type FizzBuzzEngine = 'js' | 'rust' | 'lean';

export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface ComputeResponse {
  n: number;
  result: string;
  engine: FizzBuzzEngine;
}

export interface RangeResponse {
  start: number;
  end: number;
  results: string[];
  engine: FizzBuzzEngine;
}

export interface AnalyticsStats {
  totalLogs: number;
  logsByService: Record<string, number>;
}
