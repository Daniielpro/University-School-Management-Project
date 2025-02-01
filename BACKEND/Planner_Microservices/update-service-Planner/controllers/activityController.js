const Activity = require('../models/activity');

const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date } = req.body;

    // Validar datos
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'All fields are required: title, description, date' });
    }

    // Actualizar la actividad
    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { updateActivity };