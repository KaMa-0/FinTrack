const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { ObjectId } = require('mongodb');
const WatchList = require('../models/WatchList');

const API_KEY = process.env.FINNHUB_API_KEY;
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

// GET Watchlist
router.get('/watchlist', auth.verifyToken, async (req, res) => {
    try {
        const userId = new ObjectId(req.userId);
        const watchlist = await WatchList.findOne({ userId: userId });
        res.json(watchlist?.symbols || []);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Watchlist' });
    }
});

// POST zur Watchlist hinzufügen
router.post('/watchlist', auth.verifyToken, async (req, res) => {
    try {
        const { symbol } = req.body;
        const userId = new ObjectId(req.userId);

        if (!symbol) {
            return res.status(400).json({ error: 'Symbol ist erforderlich' });
        }

        await WatchList.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { symbols: symbol } },
            { upsert: true, new: true }
        );

        res.json({ success: true, message: 'Symbol zur Watchlist hinzugefügt' });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Aktualisieren der Watchlist' });
    }
});

// DELETE von Watchlist entfernen
router.delete('/watchlist/:symbol', auth.verifyToken, async (req, res) => {
    try {
        const { symbol } = req.params;
        const userId = new ObjectId(req.userId);

        const result = await WatchList.findOneAndUpdate(
            { userId: userId },
            { $pull: { symbols: symbol } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ error: 'Watchlist nicht gefunden' });
        }

        res.json({ success: true, message: 'Symbol von Watchlist entfernt' });
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Entfernen aus der Watchlist' });
    }
});

// GET einzelne Aktie (unverändert)
router.get('/:symbol', auth.verifyToken, async (req, res) => {
    try {
        const { symbol } = req.params;
        const cached = cache.get(symbol);

        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return res.json(cached.data);
        }

        const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
        );

        if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Aktieninformationen');
        }

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

module.exports = router;