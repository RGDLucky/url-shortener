import UrlListItem from './UrlListItem';

export default function UrlList({ links, onDelete, loading }) {
    if (loading) {
        return (
            <div className="text-center py-8 text-gray-500">
                Loading links...
            </div>
        );
    }

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
