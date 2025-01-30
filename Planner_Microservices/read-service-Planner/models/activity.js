const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now, index: { expires: '7d' } }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity; 
