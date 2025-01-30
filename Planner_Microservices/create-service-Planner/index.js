require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Activity = require('./models/activity');

const app = express();
const port = process.env.PORT || 3001;  

// Middleware
app.use(bodyParser.json());

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Path to create an activity
app.post('/api/activities', async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Validate data
    if (!title || !description || !date) {
      return res.status(400).json({ error: 'All fields are required: title, description, date' });
    }

    // Create activity
    const newActivity = new Activity({ title, description, date });
    const savedActivity = await newActivity.save();

    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`create-service-Planner running on port ${port}`);
});
