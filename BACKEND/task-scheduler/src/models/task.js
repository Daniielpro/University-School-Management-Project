const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
