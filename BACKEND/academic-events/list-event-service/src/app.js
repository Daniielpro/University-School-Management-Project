require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.status(200).send("OK");
  });
app.use('/api', eventRoutes);

module.exports = app;
