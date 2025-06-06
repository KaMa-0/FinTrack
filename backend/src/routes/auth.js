const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Benutzer einloggen
 *     description: Authentifiziert einen Benutzer mit E-Mail und Passwort
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: E-Mail-Adresse des Benutzers
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Passwort des Benutzers
 *     responses:
 *       200:
 *         description: Erfolgreich eingeloggt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT Token für die Authentifizierung
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Ungültige Anmeldedaten
 *       500:
 *         description: Server-Fehler
 */
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;