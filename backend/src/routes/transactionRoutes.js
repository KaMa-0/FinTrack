const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const transactionController = require('../controllers/transactionController');

// M3_req::start [routing of API call to backend implementation]
// (see first actual code line)

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - category
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           description: Transaction ID
 *         amount:
 *           type: number
 *           description: Transaction amount
 *           example: 50.99
 *         description:
 *           type: string
 *           description: Transaction description
 *           example: "Grocery shopping"
 *         category:
 *           type: string
 *           description: Transaction category
 *           example: "groceries"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Transaction type
 *           example: "expense"
 *         date:
 *           type: string
 *           format: date-time
 *           description: Transaction date
 *         userId:
 *           type: string
 *           description: User ID who owns the transaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *     TransactionInput:
 *       type: object
 *       required:
 *         - amount
 *         - description
 *         - category
 *         - type
 *       properties:
 *         amount:
 *           type: number
 *           description: Transaction amount
 *           example: 50.99
 *         description:
 *           type: string
 *           description: Transaction description
 *           example: "Grocery shopping"
 *         category:
 *           type: string
 *           description: Transaction category
 *           example: "groceries"
 *         type:
 *           type: string
 *           enum: [income, expense]
 *           description: Transaction type
 *           example: "expense"
 *         date:
 *           type: string
 *           format: date
 *           description: Transaction date
 *           example: "2025-06-09"
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all user transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', auth.verifyToken, transactionController.getTransactions);
// M3_req -> Routing for GET method, linking to getTransactions function in backend

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', auth.verifyToken, transactionController.createTransaction);

/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update entire transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *         example: "60f7b1b9e4b0a12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth.verifyToken, transactionController.updateTransaction);
// M3_req -> Routing for PUT method, linking to updateTransactions function in backend

/**
 * @swagger
 * /api/transactions/{id}:
 *   patch:
 *     summary: Partially update transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *         example: "60f7b1b9e4b0a12345678901"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: New amount
 *                 example: 75.50
 *               description:
 *                 type: string
 *                 description: New description
 *               category:
 *                 type: string
 *                 description: New category
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 description: New type
 *               date:
 *                 type: string
 *                 format: date
 *                 description: New date
 *           example:
 *             amount: 75.50
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.patch('/:id', auth.verifyToken, transactionController.patchTransaction);
// M3_req -> Routing for PATCH method, linking to patchTransactions function in backend

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *         example: "60f7b1b9e4b0a12345678901"
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Transaction deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth.verifyToken, transactionController.deleteTransaction);
// M3_req -> Routing for DELETE method, linking to deleteTransactions function in backend

// M3_req::end

module.exports = router;
