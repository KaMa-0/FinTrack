const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stockController = require('../controllers/stockController');

/**
 * @swagger
 * /api/stocks/watchlist:
 *   get:
 *     summary: Gibt die Watchlist des Benutzers zurück
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Erfolgreich abgerufen
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 stocks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       symbol:
 *                         type: string
 *                       name:
 *                         type: string
 *                       exchange:
 *                         type: string
 *       401:
 *         description: Nicht authentifiziert
 *       500:
 *         description: Serverfehler
 */
router.get('/watchlist', auth.verifyToken, stockController.getWatchlist);

/**
 * @swagger
 * /api/stocks/watchlist:
 *   post:
 *     summary: Fügt eine Aktie zur Watchlist hinzu
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
 *                 description: Das Aktien-Symbol
 *               name:
 *                 type: string
 *                 description: Der Name der Aktie
 *               exchange:
 *                 type: string
 *                 description: Die Börse, an der die Aktie gehandelt wird
 *     responses:
 *       201:
 *         description: Aktie erfolgreich hinzugefügt
 *       400:
 *         description: Aktie bereits in der Watchlist
 *       401:
 *         description: Nicht authentifiziert
 *       500:
 *         description: Serverfehler
 */
router.post('/watchlist', auth.verifyToken, stockController.addToWatchlist);

/**
 * @swagger
 * /api/stocks/watchlist/{symbol}:
 *   delete:
 *     summary: Entfernt eine Aktie aus der Watchlist
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Das Symbol der zu entfernenden Aktie
 *     responses:
 *       200:
 *         description: Aktie erfolgreich entfernt
 *       401:
 *         description: Nicht authentifiziert
 *       404:
 *         description: Aktie nicht gefunden
 *       500:
 *         description: Serverfehler
 */
router.delete('/watchlist/:symbol', auth.verifyToken, stockController.removeFromWatchlist);

/**
 * @swagger
 * /api/stocks/{symbol}:
 *   get:
 *     summary: Ruft Detaildaten zu einer Aktie ab
 *     tags: [Stocks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Das Symbol der Aktie
 *     responses:
 *       200:
 *         description: Aktiendaten erfolgreich abgerufen
 *       401:
 *         description: Nicht authentifiziert
 *       404:
 *         description: Aktie nicht gefunden
 *       500:
 *         description: Serverfehler
 */
router.get('/:symbol', auth.verifyToken, stockController.getStockData);

module.exports = router;