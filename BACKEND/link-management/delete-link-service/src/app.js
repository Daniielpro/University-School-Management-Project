require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const linkRoutes = require('./routes/link.routes'); 

const app = express(); 
app.use(express.json());
app.use(cors());
 
connectDB();
app.use('/api/links', linkRoutes); 
app.get('/', (req, res) => {
    res.status(200).send("OK");
  });
module.exports = app; 