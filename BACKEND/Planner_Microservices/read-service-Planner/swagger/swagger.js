const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Activity API',
      version: '1.0.0',
      description: 'API para gestionar actividades',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ruta a los archivos de rutas para documentar
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };