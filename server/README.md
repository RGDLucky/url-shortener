# URL Shortener - Backend Server

A Node.js/Express REST API server for the URL Shortener application. Provides endpoints for creating, retrieving, and deleting shortened URLs.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **sql.js** - SQLite in-memory database with file persistence
- **CORS** - Cross-origin resource sharing

## Project Structure

```
server/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── linkController.js
│   ├── middleware/    # Express middleware
│   │   └── errorHandler.js
│   ├── models/        # Data access layer
│   │   └── Link.js
│   ├── routes/       # API route definitions
│   │   └── links.js
│   ├── db/           # Database management
│   │   └── index.js
│   └── index.js      # Server entry point
├── data/             # SQLite database file
├── package.json      # Dependencies
└── README.md         # This file
```

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
cd server
npm install
```

## Running

```bash
npm start        # Production mode
npm run dev      # Development mode with nodemon auto-reload
```

The server starts on `http://localhost:3001` by default.

## API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/api/links` | Create short URL | `{ "url": "https://..." }` | Created link object |
| GET | `/api/links` | List all links | - | Array of link objects |
| DELETE | `/api/links/:shortCode` | Delete a link | - | Success message |
| GET | `/:shortCode` | Redirect to original | - | 302 redirect |

### Create Link

**Request**
```bash
POST /api/links
Content-Type: application/json

{
  "url": "https://example.com/very/long/url"
}
```

**Response (201)**
```json
{
  "shortCode": "00000001",
  "shortUrl": "http://localhost:3001/00000001",
  "originalUrl": "https://example.com/very/long/url"
}
```

**Error Responses**
- `400` - Missing URL or invalid URL format
- `500` - Internal server error

### Get All Links

**Response (200)**
```json
[
  {
    "id": 1,
    "short_code": "00000001",
    "original_url": "https://example.com",
    "created_at": "2024-01-01T00:00:00.000Z",
    "shortUrl": "http://localhost:3001/00000001"
  }
]
```

### Delete Link

**Response (200)**
```json
{
  "message": "Link deleted successfully"
}
```

**Error Responses**
- `404` - Short code not found

### Redirect

Accessing `/:shortCode` returns a `302` redirect to the original URL, or `404` if not found.

## Short Code Algorithm

Uses **Base62 encoding** to convert sequential numeric IDs to 8-character alphanumeric strings:

- Characters: `0-9`, `A-Z`, `a-z` (62 possible values)
- Format: `00000000`, `0000000A`, `0000000a`, etc.
- Counter increments with each new link

**Note**: The counter resets on server restart. For production, initialize from the database's max ID.

## Database

- **Type**: SQLite (via sql.js)
- **Location**: `server/data/links.db`
- **Auto-persistence**: Changes are saved to disk after each write
- **Schema**:
  ```sql
  CREATE TABLE links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    short_code TEXT UNIQUE NOT NULL,
    original_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  ```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 3001 | Server port |
| `BASE_URL` | http://localhost:3001 | Base URL for generating short URLs |
| `NODE_ENV` | development | Environment mode (affects error responses) |

## Error Handling

- Unhandled errors are caught by `middleware/errorHandler.js`
- In development: full error messages are returned
- In production: generic "Internal Server Error" is returned
- All errors log to console with stack trace

## CORS

CORS is not explicitly configured. The server serves the React frontend from the same origin in production. For development with separate ports, add cors middleware if needed.

## Adding CORS (Optional)

```bash
npm install cors
```

```javascript
// src/index.js
const cors = require('cors');
app.use(cors());
```

## Production Deployment

1. Build the React client: `cd client && npm run build`
2. Start the server: `npm start`
3. The Express server serves both API and static frontend from `client/dist/`

## Development vs Production

| Aspect | Development | Production |
|--------|-------------|------------|
| Auto-reload | Yes (nodemon) | No |
| Error messages | Detailed | Hidden |
| Static files | Vite dev server | Served by Express |
| Port | 3001 | Configurable via PORT |

## Testing with cURL

```bash
# Create a link
curl -X POST http://localhost:3001/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com"}'

# Get all links
curl http://localhost:3001/api/links

# Delete a link
curl -X DELETE http://localhost:3001/api/links/00000001

# Visit short URL (redirects)
curl -v http://localhost:3001/00000001
```