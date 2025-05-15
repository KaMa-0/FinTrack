// backend/src/controllers/authController.js
const User = require('../models/User'); // Imports the User model for database operations
const jwt = require('jsonwebtoken'); // Imports JWT library for token generation

exports.register = async (req, res) => {
    // This function handles new user registration
    try {
        const user = await User.create(req.body); // Creates a new user using data from request body
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Creates a JWT token containing the user ID
        res.status(201).json({ token }); // Returns success status code 201 (Created) with the token
    } catch (error) {
        res.status(400).json({ error: error.message }); // Returns error status 400 (Bad Request) if registration fails
    }
};

exports.login = async (req, res) => {
    // This function handles user login
    try {
        const { email, password } = req.body; // Extracts email and password from request body
        const user = await User.findOne({ email }); // Searches database for a user with matching email
        if (!user) throw new Error('Benutzer nicht gefunden'); // If no user found, throws error in German: "User not found"

        const isValid = await bcrypt.compare(password, user.password); // Compares provided password with stored hash
        if (!isValid) throw new Error('Ungültiges Passwort'); // If passwords don't match, throws error: "Invalid password"

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Creates JWT token for authentication
        res.json({ token }); // Returns the token to the client
    } catch (error) {
        res.status(401).json({ error: error.message }); // Returns error status 401 (Unauthorized) if login fails
    }
};