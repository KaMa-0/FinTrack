const API_KEY = 'd12rsp9r01qv1k0mslugd12rsp9r01qv1k0mslv0';
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockData = async (symbol) => {
    try {
        const response = await fetch(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`);
        if (!response.ok) throw new Error('API Fehler');
        return response.json();
    } catch (error) {
        console.error('Fehler beim Laden der Aktiendaten:', error);
        throw error;
    }
};

export const getWatchlist = async () => {
    try {
        // Temporär: Verwendung von localStorage bis Backend implementiert ist
        const watchlist = localStorage.getItem('watchlist');
        return watchlist ? JSON.parse(watchlist) : [];
    } catch (error) {
        console.error('Fehler beim Laden der Watchlist:', error);
        throw error;
    }
};

export const addToWatchlist = async (symbol) => {
    try {
        // Temporär: Verwendung von localStorage bis Backend implementiert ist
        const watchlist = await getWatchlist();
        if (!watchlist.includes(symbol)) {
            watchlist.push(symbol);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
        return watchlist;
    } catch (error) {
        console.error('Fehler beim Hinzufügen zur Watchlist:', error);
        throw error;
    }
};

export const removeFromWatchlist = async (symbol) => {
    try {
        // Temporär: Verwendung von localStorage bis Backend implementiert ist
        const watchlist = await getWatchlist();
        const updatedWatchlist = watchlist.filter(s => s !== symbol);
        localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
        return updatedWatchlist;
    } catch (error) {
        console.error('Fehler beim Entfernen von der Watchlist:', error);
        throw error;
    }
};