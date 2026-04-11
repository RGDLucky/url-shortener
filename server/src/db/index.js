/**
 * Database initialization and management
 * Uses sql.js (SQLite in-memory with file persistence)
 */
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Path to SQLite database file
const DB_PATH = path.join(__dirname, '../../data/links.db');

let db = null;

/**
 * Initialize the database
 * Creates data directory if needed, loads existing DB or creates new one,
 * and ensures links table exists
 */
async function initDb() {
    const SQL = await initSqlJs();
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(path.dirname(DB_PATH))) {
        fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }
    
    // Load existing database or create new one
    if (fs.existsSync(DB_PATH)) {
        const fileBuffer = fs.readFileSync(DB_PATH);
        db = new SQL.Database(fileBuffer);
    } else {
        db = new SQL.Database();
    }
    
    // Ensure links table exists with required schema
    db.run(`
        CREATE TABLE IF NOT EXISTS links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            short_code TEXT UNIQUE NOT NULL,
            original_url TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    
    saveDb();
    return db;
}

/**
 * Persist database changes to disk
 * Call this after any write operations
 */
function saveDb() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(DB_PATH, buffer);
    }
}

/**
 * Get the current database instance
 * @returns {Object} sql.js Database instance
 */
function getDb() {
    return db;
}

module.exports = { initDb, getDb, saveDb };
