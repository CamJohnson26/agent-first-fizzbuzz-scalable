import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DatabaseService } from './database.js';
import { Logger } from './logger.js';
import fs from 'fs';
import path from 'path';

describe('DatabaseService', () => {
  let dbService: DatabaseService;
  const testDbPath = ':memory:';
  const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  } as unknown as Logger;

  beforeEach(() => {
    process.env.DATABASE_PATH = testDbPath;
    dbService = new DatabaseService(mockLogger);
  });

  afterEach(() => {
    dbService.close();
  });

  it('should initialize the database with system_info table', () => {
    const db = dbService.getDatabase();
    const table = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='system_info'").get();
    expect(table).toBeDefined();
    expect(table.name).toBe('system_info');
  });

  it('should store initialization timestamp', () => {
    const db = dbService.getDatabase();
    const result = db.prepare("SELECT value FROM system_info WHERE key='initialized_at'").get();
    expect(result).toBeDefined();
    expect(new Date(result.value).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('should create database directory if it does not exist', () => {
    const tempDir = path.join(process.cwd(), 'temp-db-dir');
    const tempDbPath = path.join(tempDir, 'test.db');
    
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
    
    process.env.DATABASE_PATH = tempDbPath;
    const service = new DatabaseService(mockLogger);
    
    expect(fs.existsSync(tempDir)).toBe(true);
    
    service.close();
    fs.rmSync(tempDir, { recursive: true });
  });
});
