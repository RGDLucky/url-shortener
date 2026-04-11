/**
 * API routes for URL shortener links
 * Endpoints: create, list, and delete short URLs
 */
const { createLink, getLinks, deleteLink } = require('../controllers/linkController');

const router = require('express').Router();

// Create a new short URL
router.post('/api/links', createLink);

// Get all shortened URLs
router.get('/api/links', getLinks);

// Delete a short URL by code
router.delete('/api/links/:shortCode', deleteLink);

module.exports = router;
