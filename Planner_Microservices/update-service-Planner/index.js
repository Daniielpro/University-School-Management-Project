require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Activity = require('./models/activity');

const app = express();
const port = process.env.PORT || 3003;

// Middleware
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Ruta para actualizar una actividad
app.put('/api/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    // Validar datos
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'All fields are required: title, description, date' });
    }

    // Buscar y actualizar la actividad
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true } // Devuelve el documento actualizado
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`update-service-Planner running on port ${port}`);
});
