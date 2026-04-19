import { singleton } from 'tsyringe';

const ANALYTICS_SERVICE_URL = process.env.ANALYTICS_SERVICE_URL || 'http://localhost:3001/api/logs';

@singleton()
export class Logger {
  public async log(message: string, metadata?: Record<string, unknown>) {
    console.log(`[LOG] ${message}`, metadata || '');
    await this.forward('info', message, metadata);
  }

  public async warn(message: string, metadata?: Record<string, unknown>) {
    console.warn(`[WARN] ${message}`, metadata || '');
    await this.forward('warn', message, metadata);
  }

  public async error(message: string, error?: unknown, metadata?: Record<string, unknown>) {
    console.error(`[ERROR] ${message}`, error, metadata || '');
    await this.forward('error', message, { 
      ...metadata, 
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error 
    });
  }

  private async forward(level: string, message: string, metadata?: Record<string, unknown>) {
    try {
      const res = await fetch(ANALYTICS_SERVICE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: 'web-server',
          level,
          message,
          metadata,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.warn(`Analytics service responded with status ${res.status}`);
      }
    } catch (error) {
      console.error('Failed to forward log to analytics service:', error);
    }
  }
}
