const Task = require('../models/task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const task = new Task({ title, description, date });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask };
