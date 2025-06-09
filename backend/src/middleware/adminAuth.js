const User = require('../models/User');
const auth = require('./auth');

// Middleware to verify user is an admin
exports.verifyAdmin = [
    auth.verifyToken, // First, verify the user is logged in
    async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);

            if (user && user.isAdmin) {
                next(); // User is admin, proceed
            } else {
                res.status(403).json({ error: 'Forbidden: Requires admin privileges' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Server error during admin verification' });
        }
    },
];
