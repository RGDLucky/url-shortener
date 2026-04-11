/**
 * Server entry point
 * Initializes Express app, database, and starts HTTP server
 */
const express = require('express');
const path = require('path');
const { initDb } = require('./db');
const linksRouter = require('./routes/links');
const { redirectLink } = require('./controllers/linkController');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Path to compiled client assets (served as static files)
const clientDistPath = path.join(__dirname, '../../client/dist');

// Serve static files from client build directory
app.use(express.static(clientDistPath));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Mount API routes for link CRUD operations
app.use(linksRouter);

// Redirect short codes to original URLs
app.get('/:shortCode', redirectLink);

// SPA fallback: serve index.html for unknown routes (handles client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Global error handler middleware
app.use(errorHandler);

async function start() {
    // Initialize SQLite database
    await initDb();
    console.log('Database initialized');
    
    // Start HTTP server
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();
