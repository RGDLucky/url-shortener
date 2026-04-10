const { createLink, getLinks, deleteLink } = require('../controllers/linkController');

const router = require('express').Router();

router.post('/api/links', createLink);
router.get('/api/links', getLinks);
router.delete('/api/links/:shortCode', deleteLink);

module.exports = router;
