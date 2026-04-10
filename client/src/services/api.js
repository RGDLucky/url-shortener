const API_BASE = '/api';

export const createLink = async (url) => {
    const response = await fetch(`${API_BASE}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create link');
    }
    
    return response.json();
};

export const getLinks = async () => {
    const response = await fetch(`${API_BASE}/links`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch links');
    }
    
    return response.json();
};

export const deleteLink = async (shortCode) => {
    const response = await fetch(`${API_BASE}/links/${shortCode}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error('Failed to delete link');
    }
    
    return response.json();
};
