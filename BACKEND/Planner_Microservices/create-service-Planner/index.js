require('dotenv').config(); // <-- Asegúrate de agregar esta línea
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger/swagger');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json()); 

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api', activityRoutes);

// Configurar Swagger
setupSwagger(app);

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Activity Planner running on port ${port}`);
});