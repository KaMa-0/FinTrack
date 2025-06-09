const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Registrierung eines neuen Benutzers
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

        // Benutzer erstellen
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

        // JWT-Token generieren
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new Error('Benutzer nicht gefunden');

        // NEUE PRÜFUNG: Verhindert Login, wenn der Account gesperrt ist
        if (user.isLocked) {
            return res.status(403).json({ error: 'Dieses Benutzerkonto ist gesperrt.' });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Ungültiges Passwort');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};