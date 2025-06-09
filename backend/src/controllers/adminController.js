const User = require('../models/User');
const Transaction = require('../models/Transaction');

// GET - All users for the admin panel
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'firstName lastName email isAdmin isLocked createdAt'); // 'isLocked' hinzugefügt
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET - System-wide statistics
exports.getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTransactions = await Transaction.countDocuments();
        res.json({
            totalUsers,
            totalTransactions,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST - Toggle lock status for a user
exports.toggleUserLock = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Sperr-Status umkehren
        user.isLocked = !user.isLocked;
        await user.save();

        const message = `User ${user.email} has been ${user.isLocked ? 'locked' : 'unlocked'}.`;
        res.json({ message, isLocked: user.isLocked });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE - Delete a user and all their transactions
exports.deleteUser = async (req, res) => {
    try {
        const userIdToDelete = req.params.id;

        // Prevent admin from deleting themselves
        if (userIdToDelete === req.userId) {
            return res.status(400).json({ error: 'Admins cannot delete their own account.' });
        }

        // Delete all transactions for that user
        await Transaction.deleteMany({ userId: userIdToDelete });

        // Delete the user
        const user = await User.findByIdAndDelete(userIdToDelete);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: `User ${user.email} and all their transactions have been deleted.` });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user: ' + error.message });
    }
};