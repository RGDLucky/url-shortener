# URL Shortener

A full-stack URL shortening application with a React frontend and Node.js/Express backend. Create custom short links, manage your link history, and track your shortened URLs.

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **sql.js** - SQLite database (in-memory with file persistence)

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd url-shortener

# Install dependencies for both client and server
cd client && npm install
cd ../server && npm install
```

### Running the Application

**Development Mode (Two Terminals)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```
Server runs at `http://localhost:3001`

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```
Client runs at `http://localhost:5173` (Vite default)

**Production Mode**

```bash
# Build the frontend
cd client && npm run build

# Start the server (serves both API and frontend)
cd ../server && npm start
```

Visit `http://localhost:3001` to use the application.

## Features

- **Create Short URLs** - Paste any valid URL and get a shortened version
- **Copy to Clipboard** - One-click copy for easy sharing
- **Link Management** - View all your shortened URLs in a list
- **Delete Links** - Remove links you no longer need
- **Automatic Redirect** - Visit a short URL to redirect to the original

## Project Structure

```
url-shortener/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/       # API calls
│   │   ├── App.jsx         # Main component
│   │   └── main.jsx       # Entry point
│   ├── public/             # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── README.md          # Client-specific docs
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Data layer
│   │   ├── routes/        # API routes
│   │   ├── db/            # Database config
│   │   └── index.js       # Entry point
│   ├── data/              # SQLite database
│   ├── package.json
│   └── README.md          # Server-specific docs
│
├── ai_log/                 # Development notes
├── Design_doc.md          # Original design document
└── README.md              # This file
```

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/links` | Create a new short URL |
| GET | `/api/links` | Get all shortened URLs |
| DELETE | `/api/links/:shortCode` | Delete a short URL |
| GET | `/:shortCode` | Redirect to original URL |

See [`server/README.md`](server/README.md) for detailed API documentation.

## Environment Variables

### Server (`.env`)

Create a `server/.env` file:

```env
PORT=3001
BASE_URL=http://localhost:3001
NODE_ENV=development
```

### Client

Create a `client/.env` file:

```env
VITE_API_BASE=/api
```

## Database

The application uses SQLite via sql.js:

- **Location**: `server/data/links.db`
- **Auto-saved**: Changes persist after each write operation
- **Schema**: Links table with id, short_code, original_url, created_at

## Development Workflow

1. **Start the server** - `cd server && npm run dev`
2. **Start the client** - `cd client && npm run dev`
3. **Make changes** - Code in your preferred editor
4. **Test** - Use the browser at `http://localhost:5173`
5. **Build** - `cd client && npm run build` for production

## Building for Production

```bash
# Build client assets
cd client
npm run build

# Start production server
cd ../server
npm start
```

The server serves the built frontend from `client/dist/`.

## Code Quality

```bash
# Lint client code
cd client && npm run lint

# Lint server code (add to package.json if needed)
cd server && npx eslint src/
```

## Future Enhancements

See [`Design_doc.md`](Design_doc.md) for planned features:

- Click counter / analytics
- QR code generation
- URL expiration
- Rate limiting
- Docker deployment

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request