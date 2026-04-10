export default function UrlListItem({ link, onDelete }) {
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link.shortUrl);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDelete = () => {
        if (confirm('Delete this link?')) {
            onDelete(link.short_code);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate">ID: {link.short_code}</p>
                <p className="text-blue-600 truncate">{link.shortUrl}</p>
                <p className="text-xs text-gray-400 truncate">{link.original_url}</p>
            </div>
            <div className="flex gap-2 ml-4">
                <button
                    onClick={handleCopy}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                    Copy
                </button>
                <button
                    onClick={handleDelete}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
