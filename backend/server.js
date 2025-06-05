const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');  // Import der Swagger-Konfiguration
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI Setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/currency', require('./src/routes/currencyRoutes'));
app.use('/api/transactions', require('./src/routes/transactionRoutes'));

// Default route
app.get('/', (req, res) => {
    res.send('FinTrack API is running');
});

// Start server
const PORT = process.env.PORT || 5000;  // Geändert auf 5000 für Swagger
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});