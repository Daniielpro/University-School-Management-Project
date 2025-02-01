const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const swaggerConfig = require('./swagger/swagger');

const app = express();

// Middleware
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/activities', activityRoutes);

// Configuración de Swagger
swaggerConfig(app);

module.exports = app;
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Activity Planner running on port ${port}`);
});