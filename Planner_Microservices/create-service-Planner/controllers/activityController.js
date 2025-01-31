const Activity = require('../models/activity');

const createActivity = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Validar datos
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'All fields are required: title, description, date' });
    }

    // Crear actividad
    const newActivity = new Activity({ title, description, date });
    const savedActivity = await newActivity.save();

    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createActivity };