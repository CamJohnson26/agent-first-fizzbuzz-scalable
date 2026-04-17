import 'reflect-metadata';
import { singleton } from 'tsyringe';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

@singleton()
export class DatabaseService {
  private db: Database.Database;

  constructor() {
    const dbPath = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'fizzbuzz.db');
    const dbDir = path.dirname(dbPath);

    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    this.db = new Database(dbPath);
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
