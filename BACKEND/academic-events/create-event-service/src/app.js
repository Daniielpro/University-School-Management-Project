require('dotenv').config(); // 💡 Asegurarse de cargar el .env primero
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors());
app.use(express.json()); 

connectDB();

app.use('/api', eventRoutes);

module.exports = app;

