const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Exam Reminder API',
            version: '1.0.0',
            description: 'API para gestionar recordatorios de exámenes'
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(swaggerOptions);