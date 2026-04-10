const express = require('express');
const path = require('path');
const { initDb } = require('./db');
const linksRouter = require('./routes/links');
const { redirectLink } = require('./controllers/linkController');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const clientDistPath = path.join(__dirname, '../../client/dist');

app.use(express.static(clientDistPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.use(linksRouter);

app.get('/:shortCode', redirectLink);

app.get('*', (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.use(errorHandler);

async function start() {
    await initDb();
    console.log('Database initialized');
    
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

start();
