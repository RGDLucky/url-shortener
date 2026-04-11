/**
 * Link model - database operations for short URLs
 * Uses Base62 encoding for short code generation
 */
const { getDb, saveDb } = require('../db');

// Base62 character set for encoding IDs
const BASE62_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const SHORT_CODE_LENGTH = 8;

/**
 * Encode a number to Base62 string
 * @param {number} num - Numeric ID to encode
 * @returns {string} Base62 encoded string
 */
function encodeBase62(num) {
    let result = '';
    while (num > 0) {
        result = BASE62_CHARS[num % 62] + result;
        num = Math.floor(num / 62);
    }
    return result.padStart(SHORT_CODE_LENGTH, BASE62_CHARS[0]);
}

// Counter for generating sequential IDs (note: resets on server restart)
let lastId = 0;

function getNextId() {
    return ++lastId;
}

function generateShortCode() {
    return encodeBase62(getNextId());
}

const Link = {
    /**
     * Create a new shortened URL
     * @param {string} originalUrl - The URL to shorten
     * @returns {Object} Created link with shortCode and originalUrl
     */
    create: (originalUrl) => {
        const shortCode = generateShortCode();
        const db = getDb();
        db.run('INSERT INTO links (short_code, original_url) VALUES (?, ?)', [shortCode, originalUrl]);
        saveDb();
        return { shortCode, originalUrl };
    },

    /**
     * Find a link by its short code
     * @param {string} shortCode - The short code to search for
     * @returns {Object|null} Link object or null if not found
     */
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

    /**
     * Get all links ordered by creation date (newest first)
     * @returns {Array} Array of link objects
     */
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

    /**
     * Delete a link by short code
     * @param {string} shortCode - The short code to delete
     */
    delete: (shortCode) => {
        const db = getDb();
        db.run('DELETE FROM links WHERE short_code = ?', [shortCode]);
        saveDb();
    }
};

module.exports = Link;
