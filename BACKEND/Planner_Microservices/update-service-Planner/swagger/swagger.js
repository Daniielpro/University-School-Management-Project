const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config(); // Cargar variables de entorno desde .env

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Activity Planner API',
      version: '1.0.0',
      description: 'API para gestionar actividades',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3003}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};