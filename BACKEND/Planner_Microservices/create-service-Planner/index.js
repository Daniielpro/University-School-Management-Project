require('dotenv').config(); // <-- Asegúrate de agregar esta línea
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const activityRoutes = require('./routes/activityRoutes');
const errorHandler = require('./middlewares/errorHandler');
const setupSwagger = require('./swagger/swagger');
const path = require('path');
const cors = require('cors'); // Requiere el paquete cors

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Habilitar CORS para todas las solicitudes
app.use(cors()); // Permite solicitudes desde cualquier origen

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api', activityRoutes);

// Configurar Swagger
setupSwagger(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Ajusta la ruta si es necesario
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Activity Planner running on port ${port}`);
});
