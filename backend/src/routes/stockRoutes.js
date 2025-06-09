const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { ObjectId } = require('mongodb');
const WatchList = require('../models/WatchList');

const API_KEY = process.env.FINNHUB_API_KEY;
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * @swagger
 * components:
 *   schemas:
 *     WatchlistResponse:
 *       type: array
 *       items:
 *         type: string
 *       example: ["AAPL", "TSLA", "GOOGL"]
 *     StockData:
 *       type: object
 *       properties:
 *         c:
 *           type: number
 *           description: Current price
 *         d:
 *           type: number
 *           description: Change
 *         dp:
 *           type: number
 *           description: Percent change
 *         h:
 *           type: number
 *           description: High price of the day
 *         l:
 *           type: number
 *           description: Low price of the day
 *         o:
 *           type: number
 *           description: Open price of the day
 *         pc:
 *           type: number
 *           description: Previous close price
 */

/**
 * @swagger
 * /api/stocks/watchlist:
 *   get:
 *     summary: Get user's stock watchlist
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's watchlist
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WatchlistResponse'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/watchlist', auth.verifyToken, async (req, res) => {
    try {
        const userId = new ObjectId(req.userId);
        const watchlist = await WatchList.findOne({ userId: userId });
        res.json(watchlist?.symbols || []);
    } catch (error) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Watchlist' });
    }
});

/**
 * @swagger
 * /api/stocks/watchlist:
 *   post:
 *     summary: Add stock symbol to watchlist
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - symbol
 *             properties:
 *               symbol:
 *                 type: string
 *                 description: Stock symbol to add
 *                 example: "AAPL"
 *     responses:
 *       200:
 *         description: Symbol added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Symbol is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/stocks/watchlist/{symbol}:
 *   delete:
 *     summary: Remove stock symbol from watchlist
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock symbol to remove
 *         example: "AAPL"
 *     responses:
 *       200:
 *         description: Symbol removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Watchlist not found
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/stocks/{symbol}:
 *   get:
 *     summary: Get stock data for specific symbol
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock symbol
 *         example: "AAPL"
 *     responses:
 *       200:
 *         description: Stock data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StockData'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching stock data
 */
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