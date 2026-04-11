# URL Shortener - Frontend Client

A React-based frontend for the URL Shortener application. Built with Vite for fast development and optimized production builds.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## Project Structure

```
client/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── UrlForm.jsx         # URL input form
│   │   ├── ShortUrlDisplay.jsx # Display created short URL
│   │   ├── UrlList.jsx         # List all shortened URLs
│   │   └── UrlListItem.jsx     # Individual link row
│   ├── services/       # API communication
│   │   └── api.js              # REST API calls
│   ├── App.jsx        # Main application component
│   └── main.jsx       # React entry point
├── public/            # Static assets
├── index.html         # HTML entry
└── package.json       # Dependencies
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## API Integration

The client communicates with the backend at `/api/*`. The `services/api.js` module provides:

- `createLink(url)` - Create a new shortened URL
- `getLinks()` - Fetch all shortened URLs
- `deleteLink(shortCode)` - Delete a short URL

### API Response Formats

**Create Link**
```json
{
  "shortCode": "00000001",
  "shortUrl": "http://localhost:3001/00000001",
  "originalUrl": "https://example.com/very/long/url"
}
```

**Get Links**
```json
[
  {
    "id": 1,
    "short_code": "00000001",
    "original_url": "https://example.com",
    "shortUrl": "http://localhost:3001/00000001",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

## Components

| Component | Description |
|-----------|-------------|
| `App` | Root component, manages global state (links, loading, errors) |
| `UrlForm` | Input form for submitting URLs to shorten |
| `ShortUrlDisplay` | Shows newly created short URL with copy button |
| `UrlList` | Displays all links with loading/empty states |
| `UrlListItem` | Individual link with copy and delete actions |

## State Management

The application uses React's built-in hooks for state:

- `useState` - Local component state
- `useEffect` - Side effects (data fetching on mount)

All API calls are handled in `App.jsx` and passed down to child components via props.

## Development Notes

- The client is configured to proxy API requests to the backend during development
- Base URL is configurable via environment variables in production
- The app uses Tailwind CSS utility classes for styling
- Clipboard API is used for copy-to-clipboard functionality

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE` | Base URL for API (optional) | `/api` |

## Building for Production

1. Run `npm run build` to create an optimized build in `dist/`
2. Serve the `dist/` folder - the Express server handles this automatically
3. The built assets are served statically by the backend