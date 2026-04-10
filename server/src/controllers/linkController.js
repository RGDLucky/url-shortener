const Link = require('../models/Link');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const createLink = (req, res, next) => {
    try {
        const { url } = req.body;
        
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        
        try {
            new URL(url);
        } catch {
            return res.status(400).json({ error: 'Invalid URL format' });
        }
        
        const link = Link.create(url);
        
        res.status(201).json({
            shortCode: link.shortCode,
            shortUrl: `${BASE_URL}/${link.shortCode}`,
            originalUrl: link.originalUrl
        });
    } catch (error) {
        next(error);
    }
};

const getLinks = (req, res, next) => {
    try {
        const links = Link.findAll();
        const formattedLinks = links.map(link => ({
            ...link,
            shortUrl: `${BASE_URL}/${link.short_code}`
        }));
        res.json(formattedLinks);
    } catch (error) {
        next(error);
    }
};

const redirectLink = (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const link = Link.findByShortCode(shortCode);
        
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        
        res.redirect(link.original_url);
    } catch (error) {
        next(error);
    }
};

const deleteLink = (req, res, next) => {
    try {
        const { shortCode } = req.params;
        const link = Link.findByShortCode(shortCode);
        
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }
        
        Link.delete(shortCode);
        res.json({ message: 'Link deleted successfully' });
    } catch (error) {
        next(error);
    }
};

module.exports = { createLink, getLinks, redirectLink, deleteLink };
