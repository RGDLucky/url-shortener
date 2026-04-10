const { getDb, saveDb } = require('../db');

function generateShortCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
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
