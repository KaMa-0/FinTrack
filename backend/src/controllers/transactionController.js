const Transaction = require('../models/Transaction');

// M4_req::start [AJAX communication/implementation of BE component]
// GET - All transactions
exports.getTransactions = async (req, res) => { // M4_req -> AJAX implementation 
    try {
        const transactions = await Transaction.find({ userId: req.userId });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// POST - Create transaction
exports.createTransaction = async (req, res) => { // M4_req -> AJAX implementation 
    try {
        const transaction = await Transaction.create({
            ...req.body,
            userId: req.userId
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PUT - Update transaction
exports.updateTransaction = async (req, res) => { // M4_req -> AJAX implementation 
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// PATCH - Partially update transaction
exports.patchTransaction = async (req, res) => { // M4_req -> AJAX implementation 
    try {
        const transaction = await Transaction.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE - Delete transaction
exports.deleteTransaction = async (req, res) => { // M4_req -> AJAX implementation 
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// M4_req::end 
