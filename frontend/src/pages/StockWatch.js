import React, { useState, useEffect } from 'react';
import './StockWatch.css';

function StockWatch() {
    const [watchlist, setWatchlist] = useState([]);
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const API_KEY = 'd12pqb9r01qv1k0mgsugd12pqb9r01qv1k0mgsv0';

    useEffect(() => {
        loadWatchlist();
        const interval = setInterval(loadWatchlist, 300000); // Alle 5 Minuten aktualisieren
        return () => clearInterval(interval);
    }, []);

    const loadWatchlist = async () => {
        const savedWatchlist = localStorage.getItem('watchlist');
        if (savedWatchlist) {
            const parsed = JSON.parse(savedWatchlist);
            setWatchlist(parsed);
            parsed.forEach(symbol => fetchStockData(symbol));
        }
    };

    const fetchStockData = async (stockSymbol) => {
        try {
            setLoading(true);
            setError('');

            const response = await fetch(
                `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${API_KEY}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.c) {
                setStockData(prevData => ({
                    ...prevData,
                    [stockSymbol]: {
                        price: data.c,
                        change: data.d,
                        changePercent: data.dp,
                        lastUpdated: new Date().toLocaleTimeString()
                    }
                }));
            } else {
                throw new Error('Keine Daten verfügbar');
            }
        } catch (err) {
            console.error('Fehler beim API-Aufruf:', err);
            setError(`Fehler beim Laden der Daten für ${stockSymbol}`);
        } finally {
            setLoading(false);
        }
    };

    const addToWatchlist = async (e) => {
        e.preventDefault();
        if (!symbol || loading) return;

        const upperSymbol = symbol.toUpperCase();
        if (watchlist.includes(upperSymbol)) {
            setError('Diese Aktie ist bereits in der Watchlist');
            return;
        }

        try {
            setLoading(true);
            setError('');
            await fetchStockData(upperSymbol);

            const newWatchlist = [...watchlist, upperSymbol];
            setWatchlist(newWatchlist);
            localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
            setSymbol('');
        } catch (err) {
            setError('Fehler beim Hinzufügen der Aktie');
            console.error('Fehler:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = (stockSymbol) => {
        const newWatchlist = watchlist.filter(s => s !== stockSymbol);
        setWatchlist(newWatchlist);
        localStorage.setItem('watchlist', JSON.stringify(newWatchlist));

        setStockData(prevData => {
            const newData = { ...prevData };
            delete newData[stockSymbol];
            return newData;
        });
    };

    return (
        <div className="stock-watch-container">
            <div className="stock-watch-header">
                <h2>Aktien Watchlist</h2>
                <form onSubmit={addToWatchlist} className="add-stock-form">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        placeholder="Aktiensymbol eingeben (z.B. AAPL)"
                        className="stock-input"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="add-button"
                        disabled={loading || !symbol}
                    >
                        {loading ? 'Lädt...' : 'Hinzufügen'}
                    </button>
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="watchlist">
                {watchlist.map(stock => (
                    <div key={stock} className="stock-card">
                        <div className="stock-header">
                            <h3>{stock}</h3>
                            <button
                                onClick={() => removeFromWatchlist(stock)}
                                className="remove-button"
                                title="Entfernen"
                            >
                                ×
                            </button>
                        </div>
                        {stockData[stock] ? (
                            <div className="stock-info">
                                <p>Preis: ${parseFloat(stockData[stock].price).toFixed(2)}</p>
                                <p className={parseFloat(stockData[stock].change) >= 0 ? 'positive' : 'negative'}>
                                    Änderung: ${parseFloat(stockData[stock].change).toFixed(2)}
                                    ({stockData[stock].changePercent}%)
                                </p>
                                <small>Zuletzt aktualisiert: {stockData[stock].lastUpdated}</small>
                            </div>
                        ) : (
                            <p className="loading">Lade Daten...</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StockWatch;