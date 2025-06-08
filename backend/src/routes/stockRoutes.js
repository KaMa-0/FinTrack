const express = require('express');
const router = express.Router();

const API_KEY = process.env.FINNHUB_API_KEY;
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 Minuten

router.get('/api/stocks/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const cached = cache.get(symbol);

        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return res.json(cached.data);
        }

        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );
        const data = await response.json();

        cache.set(symbol, {
            timestamp: Date.now(),
            data: data
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/watchlist', async (req, res) => {
    // TODO: Benutzer-ID aus Session/Token
    const userId = req.user.id;
    const watchlist = await WatchList.findOne({ userId });
    res.json(watchlist.symbols);
});

router.post('/api/watchlist', async (req, res) => {
    const { symbol } = req.body;
    const userId = req.user.id;

    await WatchList.findOneAndUpdate(
        { userId },
        { $addToSet: { symbols: symbol } },
        { upsert: true }
    );

    res.json({ success: true });
});