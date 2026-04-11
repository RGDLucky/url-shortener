/**
 * URL input form component
 * Allows users to enter a URL to be shortened
 */
import { useState } from 'react';

export default function UrlForm({ onSubmit, loading }) {
    const [url, setUrl] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-xl mx-auto">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to shorten"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
            />
            <button
                type="submit"
                disabled={loading || !url.trim()}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Shortening...' : 'Shorten'}
            </button>
        </form>
    );
}
