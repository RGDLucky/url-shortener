const { getDb, saveDb } = require('../db');

const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SHORT_CODE_LENGTH = 8;

function encodeBase62(num) {
    let result = '';
    while (num > 0) {
        result = BASE62_CHARS[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result.padStart(SHORT_CODE_LENGTH, BASE62_CHARS[0]);
}

let lastId = 0;

function getNextId() {
    return ++lastId;
}

function generateShortCode() {
    return encodeBase62(getNextId());
}

const Link = {
    create: (originalUrl) => {
        const shortCode = generateShortCode();
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
