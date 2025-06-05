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
router.get('/', auth, transactionController.getTransactions);