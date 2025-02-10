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


const tareasDB = mongoose.createConnection('mongodb://admin:1751404730@98.82.9.250:27017/tareasDB?authSource=admin');
console.log('✅ Conectado a tareasDB');


const maestrosDB = mongoose.createConnection('mongodb://admin:1751404730@98.82.9.250:27017/maestrosDB?authSource=admin');
console.log('✅ Conectado a maestrosDB');


module.exports = { app, tareasDB, maestrosDB };


const tareaRoutes = require('./routes/tareaRoutes');
const profesorRoutes = require('./routes/profesorRoutes'); 

app.use('/api/tareas', tareaRoutes);
app.use('/api/profesores', profesorRoutes); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


