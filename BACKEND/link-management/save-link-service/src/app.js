require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');  // Verifica que esta línea esté bien escrita
const linkRoutes = require('./routes/link.routes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB(); // Esto debería funcionar correctamente si está bien importado

app.use('/api/links', linkRoutes);
app.get('/', (req, res) => {
    res.status(200).send("OK");
  });
module.exports = app;
