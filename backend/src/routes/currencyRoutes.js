// backend/routes/currencyRoutes.js
const express = require('express');
const { query } = require('express-validator');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

/**
 * @swagger
 * /api/currency/convert:
 *   get:
 *     summary: Konvertiert einen Geldbetrag zwischen verschiedenen Währungen
 *     tags: [Currency]
 *     parameters:
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         description: Der umzurechnende Betrag
 *       - in: query
 *         name: fromCurrency
 *         required: true
 *         schema:
 *           type: string
 *           enum: [EUR, USD, GBP, CHF, JPY]
 *         description: Ausgangswährung
 *       - in: query
 *         name: toCurrency
 *         required: true
 *         schema:
 *           type: string
 *           enum: [EUR, USD, GBP, CHF, JPY]
 *         description: Zielwährung
 *     responses:
 *       200:
 *         description: Erfolgreiche Umrechnung
 *       400:
 *         description: Ungültige Parameter
 *       500:
 *         description: Server-Fehler
 */
router.get('/convert', [
    query('amount').isFloat(),
    query('fromCurrency').isIn(['EUR', 'USD', 'GBP', 'CHF', 'JPY']),
    query('toCurrency').isIn(['EUR', 'USD', 'GBP', 'CHF', 'JPY'])
], currencyController.convertCurrency);

module.exports = router;