/**
 * Displays a list of all shortened URLs
 * Shows loading state, empty state, or the list of links
 */
import UrlListItem from './UrlListItem';

export default function UrlList({ links, onDelete, loading }) {
    // Show loading state while fetching links
    if (loading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Loading links...
            </div>
        );
    }

    // Show empty state when no links exist
    if (links.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No links yet. Create your first short URL above!
            </div>
        );
    }

    return (
        <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-800">Your Links</h2>
            {links.map((link) => (
                <UrlListItem key={link.short_code} link={link} onDelete={onDelete} />
            ))}
        </div>
    );
}
