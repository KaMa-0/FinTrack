const express = require('express'); // Foundation of the backend application.
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');
require('dotenv').config();

const app = express(); //Creates an instance of express application.

// Middleware
app.use(cors()); // Allows cross-origin requests from the frontend.
app.use(express.json()); // It makes the JSON data sent in POST or PUT available on the req.body property.

// Swagger-Dokumentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Verbindung zur MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:', err);
        process.exit(1); // Beende den Prozess bei Verbindungsfehler
    });

// Routen
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/currency', require('./src/routes/currencyRoutes'));
app.use('/api/transactions', require('./src/routes/transactionRoutes'));
app.use('/api/stocks', require('./src/routes/stockRoutes'));

// Root-Route
app.get('/', (req, res) => {
    res.send('FinTrack API is running');
});

// Server starten
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});