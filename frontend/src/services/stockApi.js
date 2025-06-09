const API_BASE = 'http://localhost:5001/api/stocks';

export const fetchStockData = async (symbol) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_BASE}/${symbol}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) throw new Error('API Fehler');
        return response.json();
    } catch (error) {
        console.error('Fehler beim Laden der Aktiendaten:', error);
        throw error;
    }
};

export const getWatchlist = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_BASE}/watchlist`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) throw new Error('Watchlist laden fehlgeschlagen');
        return response.json();
    } catch (error) {
        console.error('Fehler beim Laden der Watchlist:', error);
        throw error;
    }
};

export const addToWatchlist = async (symbol) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_BASE}/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ symbol })
        });
        if (!response.ok) throw new Error('Hinzufügen fehlgeschlagen');
        return response.json();
    } catch (error) {
        console.error('Fehler beim Hinzufügen zur Watchlist:', error);
        throw error;
    }
};

export const removeFromWatchlist = async (symbol) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_BASE}/watchlist/${symbol}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) throw new Error('Entfernen fehlgeschlagen');
        return response.json();
    } catch (error) {
        console.error('Fehler beim Entfernen von der Watchlist:', error);
        throw error;
    }
};