const API_URL = 'http://localhost:5001/api/stocks';

export const StockService = {
    async fetchStockData(token, symbol) {
        const response = await fetch(`${API_URL}/${symbol}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Fehler beim Laden der Aktiendaten');
        return response.json();
    },

    async getWatchlist(token) {
        const response = await fetch(`${API_URL}/watchlist`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Watchlist laden fehlgeschlagen');
        return response.json();
    },

    async addToWatchlist(token, symbol) {
        const response = await fetch(`${API_URL}/watchlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ symbol })
        });
        if (!response.ok) throw new Error('Hinzufügen fehlgeschlagen');
        return response.json();
    },

    async removeFromWatchlist(token, symbol) {
        const response = await fetch(`${API_URL}/watchlist/${symbol}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Entfernen fehlgeschlagen');
        return response.json();
    }
};
