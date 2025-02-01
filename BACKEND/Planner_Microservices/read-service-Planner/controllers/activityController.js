const Activity = require('../models/activity');

// Obtener todas las actividades
const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Buscar actividades por título o descripción
const searchActivities = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const activities = await Activity.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });

    res.status(200).json(activities);
  } catch (error) {
    console.error('Error searching activities:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getActivities,
  searchActivities,
};