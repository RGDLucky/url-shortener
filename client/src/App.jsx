import { useState, useEffect } from 'react';
import UrlForm from './components/UrlForm';
import ShortUrlDisplay from './components/ShortUrlDisplay';
import UrlList from './components/UrlList';
import { createLink, getLinks, deleteLink } from './services/api';

function App() {
  const [links, setLinks] = useState([]);
  const [latestShortUrl, setLatestShortUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (url) => {
    setLoading(true);
    setError(null);
    setLatestShortUrl(null);
    
    try {
      const result = await createLink(url);
      setLatestShortUrl(result.shortUrl);
      fetchLinks();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await deleteLink(shortCode);
      fetchLinks();
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
