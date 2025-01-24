require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Activity = require('./models/activity');

const app = express();
const port = process.env.PORT || 3002;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Ruta para obtener todas las actividades
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Ruta para buscar actividades por título o descripción
app.get('/api/activities/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // Buscar actividades por título o descripción
    const activities = await Activity.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Búsqueda insensible a mayúsculas
        { description: { $regex: query, $options: 'i' } }
      ]
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error searching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`read-service-Planner running on port ${port}`);
});
