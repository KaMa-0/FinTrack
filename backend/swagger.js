const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FinTrack API',
            version: '1.0.0',
            description: 'API für FinTrack'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: ['./src/routes/*.js'] // Pfad zu den Routen-Dateien
};

module.exports = swaggerJsDoc(swaggerOptions);