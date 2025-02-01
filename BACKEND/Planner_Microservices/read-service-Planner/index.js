const express = require('express');
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');
require('dotenv').config(); // Cargar variables de entorno desde .env
const app = express();

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api', activityRoutes);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`read-service-Planner running on port ${port}`);
});