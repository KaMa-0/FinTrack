// backend/app.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const currencyRoutes = require('./routes/currencyRoutes');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/currency', currencyRoutes);

module.exports = app;