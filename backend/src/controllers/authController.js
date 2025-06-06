const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phone,
            birthDate,
            address,
            city,
            postalCode
        } = req.body;

        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            phone,
            birthDate,
            address,
            city,
            postalCode
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Create JWT token for the user
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message }); // Return error message if registration fails
    }
};

exports.login = async (req, res) => { // Handle user login
    try {
        const { email, password } = req.body; // Extract email and password from request body
        const user = await User.findOne({ email });
        if (!user) throw new Error('Benutzer nicht gefunden');

        const isValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hashed password
        if (!isValid) throw new Error('Ungültiges Passwort');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // Create JWT token for the user
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};