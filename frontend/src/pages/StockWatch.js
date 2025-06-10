import React, { useState, useEffect } from 'react';
import { StockService } from '../services/stockService';
import './StockWatch.css';

function StockWatch() {
    const [watchlist, setWatchlist] = useState([]);
    const [stockData, setStockData] = useState({});
    const [symbol, setSymbol] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingStocks, setLoadingStocks] = useState(new Set()); // Track which stocks are loading

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (user && user.token) {
            loadWatchlist();
        }
    }, []);

    const loadWatchlist = async () => {
        try {
            setLoading(true);
            setError(''); //Clears any previous error

            console.log('🔄 Loading watchlist...');
            const symbols = await StockService.getWatchlist(user.token);
            console.log('📋 Watchlist received:', symbols);

            setWatchlist(symbols);

            // Load stock data for each symbol
            if (symbols && symbols.length > 0) {
                loadAllStockData(symbols);
            }

        } catch (err) {
            console.error('❌ Error loading watchlist:', err);
            setError('Error loading watchlist: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadAllStockData = async (symbols) => {
        console.log('🔄 Loading stock data for:', symbols);

        // Set loading state for all symbols
        setLoadingStocks(new Set(symbols));

        // Load each stock data
        for (const symbol of symbols) {
            try {
                await loadSingleStockData(symbol);
            } catch (err) {
                console.error(`❌ Error loading ${symbol}:`, err);
            }
        }

        // Clear loading state
        setLoadingStocks(new Set());
    };

    const loadSingleStockData = async (stockSymbol) => {
        try {
            console.log(`🔄 Loading data for ${stockSymbol}...`);

            const data = await StockService.fetchStockData(user.token, stockSymbol);
            console.log(`📊 ${stockSymbol} data received:`, data);

            // Check if we have the expected data format
            if (data && typeof data.c !== 'undefined') {
                const processedData = {
                    price: parseFloat(data.c).toFixed(2),
                    change: parseFloat(data.d || 0).toFixed(2),
                    changePercent: parseFloat(data.dp || 0).toFixed(2),
                    lastUpdated: new Date().toLocaleTimeString(),
                };

                setStockData(prevData => ({
                    ...prevData,
                    [stockSymbol]: processedData
                }));

                console.log(`✅ ${stockSymbol} processed:`, processedData);
            } else {
                console.warn(`⚠️ ${stockSymbol} - No price data (c field missing):`, data);
            }

        } catch (err) {
            console.error(`❌ Error loading ${stockSymbol}:`, err);
            throw err;
        }
    };

    const addStock = async (e) => {
        e.preventDefault();

        if (!symbol.trim()) return;

        const upperSymbol = symbol.toUpperCase();

        // Check if already exists
        if (watchlist.includes(upperSymbol)) {
            setError(`${upperSymbol} is already in your watchlist`);
            return;
        }

        try {
            setLoading(true);
            setError('');

            console.log(`➕ Adding ${upperSymbol} to watchlist...`);

            // Add to backend
            await StockService.addToWatchlist(user.token, upperSymbol);
            console.log(`✅ ${upperSymbol} added to backend`);

            // Update local watchlist
            setWatchlist(prev => [...prev, upperSymbol]);

            // Load stock data for new symbol
            await loadSingleStockData(upperSymbol);

            // Clear input
            setSymbol('');

        } catch (err) {
            console.error('❌ Error adding stock:', err);
            setError('Error adding stock: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const removeStock = async (stockSymbol) => {
        try {
            console.log(`➖ Removing ${stockSymbol}...`);

            await StockService.removeFromWatchlist(user.token, stockSymbol);
            console.log(`✅ ${stockSymbol} removed from backend`);

            // Update local state
            setWatchlist(prev => prev.filter(s => s !== stockSymbol));
            setStockData(prev => {
                const newData = { ...prev };
                delete newData[stockSymbol];
                return newData;
            });

        } catch (err) {
            console.error('❌ Error removing stock:', err);
            setError('Error removing stock: ' + err.message);
        }
    };
    const isStockLoading = (symbol) => {
        return loadingStocks.has(symbol);
    };

    return (
        <div className="stock-watch-container">
            <div className="stock-watch-header">
                <div className="header-controls">
                    <h2>Stock Watchlist</h2>
                </div>

                <form onSubmit={addStock} className="add-stock-form">
                    <input
                        type="text"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                        placeholder="Enter stock symbol (e.g., AAPL)"
                        className="stock-input"
                        disabled={loading}
                        maxLength={10}
                    />
                    <button
                        type="submit"
                        className="add-button"
                        disabled={loading || !symbol.trim()}
                    >
                        {loading ? 'Adding...' : 'Add Stock'}
                    </button>
                </form>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                    <button
                        onClick={() => setError('')}
                        className="dismiss-error"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="watchlist-container">
                {loading && watchlist.length === 0 && (
                    <div className="loading-message">
                        Loading your watchlist...
                    </div>
                )}

                {watchlist.length === 0 && !loading && (
                    <div className="empty-watchlist">
                        <p>Your watchlist is empty</p>
                        <p>Add some stocks to get started!</p>
                    </div>
                )}

                <div className="watchlist">
                    {watchlist.map(stock => (
                        <div key={stock} className="stock-card">
                            <div className="stock-header">
                                <h3>{stock}</h3>
                                <button
                                    onClick={() => removeStock(stock)}
                                    className="remove-button"
                                    title="Remove from watchlist"
                                >
                                    ×
                                </button>
                            </div>

                            {isStockLoading(stock) ? (
                                <div className="loading-placeholder">
                                    <p>Loading price data...</p>
                                </div>
                            ) : stockData[stock] ? (
                                <div className="stock-info">
                                    <p className="stock-price">
                                        ${stockData[stock].price}
                                    </p>
                                    <p className={`stock-change ${parseFloat(stockData[stock].change) >= 0 ? 'positive' : 'negative'}`}>
                                        {parseFloat(stockData[stock].change) >= 0 ? '+' : ''}
                                        ${stockData[stock].change} ({stockData[stock].changePercent}%)
                                    </p>
                                    <small className="last-updated">
                                        Updated: {stockData[stock].lastUpdated}
                                    </small>
                                </div>
                            ) : (
                                <div className="error-placeholder">
                                    Failed to load price data
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StockWatch;