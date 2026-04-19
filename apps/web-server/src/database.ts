import 'reflect-metadata';
import { singleton, inject } from 'tsyringe';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { Logger } from './logger.js';

@singleton()
export class DatabaseService {
  private db: Database.Database;

  constructor(
    @inject(Logger) private logger: Logger
  ) {
    let dbPath = process.env.DATABASE_PATH;
    
    if (!dbPath) {
      dbPath = path.join(process.cwd(), 'data', 'fizzbuzz.db');
    }

    if (dbPath !== ':memory:') {
      const dbDir = path.dirname(dbPath);
      if (!fs.existsSync(dbDir)) {
        try {
          fs.mkdirSync(dbDir, { recursive: true });
        } catch (error) {
          this.logger.warn(`Failed to create database directory: ${dbDir}`, { error });
          dbPath = ':memory:';
        }
      }
    }

    try {
      this.db = new Database(dbPath);
    } catch (error) {
      this.logger.error(`Failed to open database at ${dbPath}, falling back to :memory:`, error);
      this.db = new Database(':memory:');
    }
    this.initialize();
  }

  private initialize() {
    // Initial schema setup could go here
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS system_info (
        key TEXT PRIMARY KEY,
        value TEXT
      )
    `);
    
    // Set a flag to indicate that SQLite is initialized
    const stmt = this.db.prepare('INSERT OR REPLACE INTO system_info (key, value) VALUES (?, ?)');
    stmt.run('initialized_at', new Date().toISOString());
  }

  public getDatabase(): Database.Database {
    return this.db;
  }

  public close() {
    this.db.close();
  }
}
