const axios = require('axios');
const { validationResult } = require('express-validator');

exports.convertCurrency = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { amount, fromCurrency, toCurrency } = req.query;
        const response = await axios.get(
            `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );

        const rate = response.data.rates[toCurrency];
        const result = (parseFloat(amount) * rate).toFixed(2);

        res.json({
            amount: parseFloat(amount),
            fromCurrency,
            toCurrency,
            result: parseFloat(result),
            rate
        });
    } catch (error) {
        res.status(500).json({ error: 'Währungsumrechnung fehlgeschlagen' });
    }
};