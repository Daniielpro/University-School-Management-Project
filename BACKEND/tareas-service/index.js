require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = process.env.PORT || 8084;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión a MongoDB para tareasDB
const tareasDB = mongoose.createConnection('mongodb://localhost:27017/tareasDB');
console.log('✅ Conectado a tareasDB');

// Conexión a MongoDB para maestrosDB
const maestrosDB = mongoose.createConnection('mongodb://localhost:27017/maestrosDB');
console.log('✅ Conectado a maestrosDB');

// Exportar conexiones antes de importar otros módulos
module.exports = { app, tareasDB, maestrosDB };

// Importar rutas
const tareaRoutes = require('./routes/tareaRoutes');
const profesorRoutes = require('./routes/profesorRoutes'); // <-- Nuevo

app.use('/api/tareas', tareaRoutes);
app.use('/api/profesores', profesorRoutes); // <-- Nuevo
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


