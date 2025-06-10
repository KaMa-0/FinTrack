const axios = require('axios');
const { validationResult } = require('express-validator');

// M5_req::start [HTTP endpoint returning data as JSON]
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

        const rate = response.data.rates[toCurrency]; // Automatic JSON parse
        const result = (parseFloat(amount) * rate).toFixed(2);

        res.json({ // M5_req -> data returned as JSON for GET call
            amount: parseFloat(amount),
            fromCurrency,
            toCurrency,
            result: parseFloat(result),
            rate
        });
    } catch (error) { // Automatic error handling
        res.status(500).json({ error: 'Währungsumrechnung fehlgeschlagen' });
    }
};

// M5_req::end
