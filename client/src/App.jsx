/**
 * Main application component
 * Manages state for links, loading states, and user interactions
 */
import { useState, useEffect } from 'react';
import UrlForm from './components/UrlForm';
import ShortUrlDisplay from './components/ShortUrlDisplay';
import UrlList from './components/UrlList';
import { createLink, getLinks, deleteLink } from './services/api';

function App() {
  // State for storing all shortened links
  const [links, setLinks] = useState([]);
  // State for displaying the most recently created short URL
  const [latestShortUrl, setLatestShortUrl] = useState(null);
  // Loading state for link creation
  const [loading, setLoading] = useState(false);
  // Loading state for fetching links list
  const [listLoading, setListLoading] = useState(false);
  // Error state for displaying user-friendly error messages
  const [error, setError] = useState(null);

  // Fetch all links on component mount
  const fetchLinks = async () => {
    setListLoading(true);
    try {
      const data = await getLinks();
      setLinks(data);
    } catch (err) {
      console.error('Failed to fetch links:', err);
    } finally {
      setListLoading(false);
    }
  };

  // Load links when component mounts
  useEffect(() => {
    fetchLinks();
  }, []);

  // Handle URL form submission
  const handleSubmit = async (url) => {
    setLoading(true);
    setError(null);
    setLatestShortUrl(null);
    
    try {
      const result = await createLink(url);
      setLatestShortUrl(result.shortUrl);
      // Refresh the links list after creating a new link
      fetchLinks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle link deletion
  const handleDelete = async (shortCode) => {
    try {
      await deleteLink(shortCode);
      // Refresh the links list after deletion
      fetchLinks();
      // Clear the display if the deleted link was the most recently created
      if (latestShortUrl?.includes(shortCode)) {
        setLatestShortUrl(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          URL Shortener
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Paste a long URL to get a short link
        </p>

        <UrlForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center max-w-xl mx-auto">
            {error}
          </div>
        )}

        {latestShortUrl && <ShortUrlDisplay shortUrl={latestShortUrl} />}

        <div className="mt-12">
          <UrlList 
            links={links} 
            onDelete={handleDelete} 
            loading={listLoading} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
