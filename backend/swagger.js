const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FinTrack API',
            version: '1.0.0',
            description: 'API Dokumentation für FinTrack',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);