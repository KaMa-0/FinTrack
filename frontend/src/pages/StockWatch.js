import React, { useState, useEffect } from 'react';
import './StockWatch.css';
import { StockService } from '../services/stockService';

const TEXTS = {
    TITLE: 'Aktien Watchlist',
    INPUT_PLACEHOLDER: 'Aktiensymbol eingeben (z.B. AAPL)',
    LOADING: 'Lädt...',
    ADD_BUTTON: 'Hinzufügen',
    PRICE: 'Preis',
    CHANGE: 'Änderung',
    LAST_UPDATED: 'Zuletzt aktualisiert',
    LOADING_DATA: 'Lade Daten...',
    REMOVE_TITLE: 'Entfernen',
    ERRORS: {
        LOAD_WATCHLIST: 'Fehler beim Laden der Watchlist',
        LOAD_STOCK: (symbol) => `Fehler beim Laden der Daten für ${symbol}`,
        NO_DATA: 'Keine Daten verfügbar',
        ALREADY_IN_LIST: 'Diese Aktie ist bereits in der Watchlist',
        ADD_STOCK: 'Fehler beim Hinzufügen der Aktie',
        REMOVE_STOCK: 'Fehler beim Entfernen der Aktie'
    }
};

function StockWatch() {
    const [watchlist, setWatchlist] = useState([]);
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve stored user info

    useEffect(() => {
        loadWatchlist();
        const interval = setInterval(loadWatchlist, 300000);
        return () => clearInterval(interval);
    }, []);

    const loadWatchlist = async () => {
        try {
            setError('');
            const symbols = await StockService.getWatchlist(user.token);
            setWatchlist(symbols);
            symbols.forEach(fetchStockQuote);
        } catch (err) {
            setError(TEXTS.ERRORS.LOAD_WATCHLIST);
        }
    };

    const fetchStockQuote = async (stockSymbol) => {
        try {
            setLoading(true);
            setError('');
            const data = await StockService.fetchStockData(user.token, stockSymbol);

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
                throw new Error(TEXTS.ERRORS.NO_DATA);
            }
        } catch (err) {
            setError(TEXTS.ERRORS.LOAD_STOCK(stockSymbol));
        } finally {
            setLoading(false);
        }
    };

    const addToWatchlist = async (e) => {
        e.preventDefault();
        if (!symbol || loading) return;

        const upperSymbol = symbol.toUpperCase();
        if (watchlist.includes(upperSymbol)) {
            setError(TEXTS.ERRORS.ALREADY_IN_LIST);
            return;
        }

        try {
            setLoading(true);
            setError('');
            await StockService.addToWatchlist(user.token, upperSymbol);
            await fetchStockQuote(upperSymbol);
            await loadWatchlist();
            setSymbol('');
        } catch (err) {
            setError(TEXTS.ERRORS.ADD_STOCK);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = async (stockSymbol) => {
        try {
            await StockService.removeFromWatchlist(user.token, stockSymbol);
            setWatchlist(prevList => prevList.filter(s => s !== stockSymbol));
            setStockData(prevData => {
                const newData = { ...prevData };
                delete newData[stockSymbol];
                return newData;
            });
        } catch (err) {
            setError(TEXTS.ERRORS.REMOVE_STOCK);
        }
    };

    return (
        <div className="stock-watch-container">
            <div className="stock-watch-header">
                <h2>{TEXTS.TITLE}</h2>
                <form onSubmit={addToWatchlist} className="add-stock-form">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        placeholder={TEXTS.INPUT_PLACEHOLDER}
                        className="stock-input"
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        className="add-button"
                        disabled={loading || !symbol}
                    >
                        {loading ? TEXTS.LOADING : TEXTS.ADD_BUTTON}
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
                                title={TEXTS.REMOVE_TITLE}
                            >
                                ×
                            </button>
                        </div>
                        {stockData[stock] ? (
                            <div className="stock-info">
                                <p>{TEXTS.PRICE}: ${parseFloat(stockData[stock].price).toFixed(2)}</p>
                                <p className={parseFloat(stockData[stock].change) >= 0 ? 'positive' : 'negative'}>
                                    {TEXTS.CHANGE}: ${parseFloat(stockData[stock].change).toFixed(2)}
                                    ({stockData[stock].changePercent}%)
                                </p>
                                <small>{TEXTS.LAST_UPDATED}: {stockData[stock].lastUpdated}</small>
                            </div>
                        ) : (
                            <p className="loading">{TEXTS.LOADING_DATA}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StockWatch;

