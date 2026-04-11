/**
 * Displays the newly created short URL with copy-to-clipboard functionality
 */
import { useState } from 'react';

export default function ShortUrlDisplay({ shortUrl }) {
    const [copied, setCopied] = useState(false);

    // Copy the short URL to clipboard
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            // Reset copied state after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg max-w-xl mx-auto">
            <p className="text-sm text-green-600 mb-2">Short URL created!</p>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={shortUrl}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-green-300 rounded text-gray-800"
                />
                <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
        </div>
    );
}
