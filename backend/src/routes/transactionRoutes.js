const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Alle Transaktionen abrufen
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste aller Transaktionen
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   amount:
 *                     type: number
 *                   description:
 *                     type: string
 */
router.get('/', auth.verifyToken, transactionController.getTransactions);

// POST - Create transaction
router.post('/', auth.verifyToken, transactionController.createTransaction);

// PUT - Update entire transaction
router.put('/:id', auth.verifyToken, transactionController.updateTransaction);

// PATCH - Partially update transaction
router.patch('/:id', auth.verifyToken, transactionController.patchTransaction);

// DELETE - Delete transaction
router.delete('/:id', auth.verifyToken, transactionController.deleteTransaction);

module.exports = router;