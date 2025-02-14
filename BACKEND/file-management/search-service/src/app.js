require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const fileRoutes = require('./routes/file.routes');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use('/api/files', fileRoutes);
app.get('/', (req, res) => {
    res.status(200).send("OK");
  });
module.exports = app;

