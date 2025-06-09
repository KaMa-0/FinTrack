const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/adminAuth');

// Alle Routen in dieser Datei sind geschützt und erfordern Admin-Rechte
router.use(verifyAdmin);

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *       403:
 *         description: Forbidden
 */
router.get('/users', adminController.getAllUsers);

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Get system-wide statistics
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: System statistics.
 *       403:
 *         description: Forbidden
 */
router.get('/stats', adminController.getSystemStats);

/**
 * @swagger
 * /api/admin/users/{id}/lock:
 *   post:
 *     summary: Toggle lock status for a user (simulated)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User lock status toggled.
 *       403:
 *         description: Forbidden
 */
router.post('/users/:id/lock', adminController.toggleUserLock);

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user and all their transactions
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       400:
 *         description: Admin cannot delete themselves.
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found.
 */
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
