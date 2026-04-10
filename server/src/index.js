const express = require('express');
const { initDb } = require('./db');
const linksRouter = require('./routes/links');
const { redirectLink } = require('./controllers/linkController');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'URL Shortener API is running' });
});

app.use(linksRouter);

app.get('/:shortCode', redirectLink);

app.use(errorHandler);

async function start() {
    await initDb();
    console.log('Database initialized');
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();
