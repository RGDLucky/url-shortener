/**
 * API service for communicating with the backend
 * Provides functions to create, fetch, and delete shortened URLs
 */

const API_BASE = '/api';

/**
 * Create a new shortened URL
 * @param {string} url - The original URL to shorten
 * @returns {Object} Created link with shortCode, shortUrl, and originalUrl
 */
export const createLink = async (url) => {
    const response = await fetch(`${API_BASE}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create link');
    }
    
    return response.json();
};

/**
 * Fetch all shortened URLs
 * @returns {Array} Array of link objects
 */
export const getLinks = async () => {
    const response = await fetch(`${API_BASE}/links`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch links');
    }
    
    return response.json();
};

/**
 * Delete a shortened URL by its short code
 * @param {string} shortCode - The short code of the link to delete
 * @returns {Object} Success message
 */
export const deleteLink = async (shortCode) => {
    const response = await fetch(`${API_BASE}/links/${shortCode}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete link');
    }
    
    return response.json();
};
