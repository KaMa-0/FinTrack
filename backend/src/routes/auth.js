const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User password
 *           example: "mypassword123"
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: User password (min 6 characters)
 *           example: "mypassword123"
 *         firstName:
 *           type: string
 *           description: User first name
 *           example: "John"
 *         lastName:
 *           type: string
 *           description: User last name
 *           example: "Doe"
 *         phone:
 *           type: string
 *           description: Phone number (optional)
 *           example: "+49 123 456789"
 *         birthDate:
 *           type: string
 *           format: date
 *           description: Birth date (optional)
 *           example: "1990-01-01"
 *         address:
 *           type: string
 *           description: Street address (optional)
 *           example: "Musterstraße 123"
 *         city:
 *           type: string
 *           description: City (optional)
 *           example: "Berlin"
 *         postalCode:
 *           type: string
 *           description: Postal code (optional)
 *           example: "12345"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT authentication token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid input data or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email bereits registriert"
 *       500:
 *         description: Server error
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticate user with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ungültiges Passwort"
 *       500:
 *         description: Server error
 */
router.post('/login', authController.login);

module.exports = router;