const { getDb, saveDb } = require('../db');

const SHORT_CODE_LENGTH = 8;
const MAX_GENERATION_ATTEMPTS = 10;
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateShortCode() {
    let result = '';
    for (let i = 0; i < SHORT_CODE_LENGTH; i++) {
        result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }
    return result;
}

function codeExists(shortCode) {
    const db = getDb();
    const stmt = db.prepare('SELECT 1 FROM links WHERE short_code = ?');
    stmt.bind([shortCode]);
    const exists = stmt.step();
    stmt.free();
    return exists;
}

function generateUniqueCode() {
    for (let attempt = 1; attempt <= MAX_GENERATION_ATTEMPTS; attempt++) {
        const code = generateShortCode();
        if (!codeExists(code)) {
            return code;
        }
        if (attempt === MAX_GENERATION_ATTEMPTS) {
            throw new Error('Failed to generate unique short code after maximum attempts');
        }
    }
}

const Link = {
    create: (originalUrl) => {
        const shortCode = generateUniqueCode();
        const db = getDb();
        db.run('INSERT INTO links (short_code, original_url) VALUES (?, ?)', [shortCode, originalUrl]);
        saveDb();
        return { shortCode, originalUrl };
    },

    findByShortCode: (shortCode) => {
        const db = getDb();
        const stmt = db.prepare('SELECT * FROM links WHERE short_code = ?');
        stmt.bind([shortCode]);
        if (stmt.step()) {
            const row = stmt.getAsObject();
            stmt.free();
            return row;
        }
        stmt.free();
        return null;
    },

    findAll: () => {
        const db = getDb();
        const results = [];
        const stmt = db.prepare('SELECT * FROM links ORDER BY created_at DESC');
        while (stmt.step()) {
            results.push(stmt.getAsObject());
        }
        stmt.free();
        return results;
    },

    delete: (shortCode) => {
        const db = getDb();
        db.run('DELETE FROM links WHERE short_code = ?', [shortCode]);
        saveDb();
    }
};

module.exports = Link;
