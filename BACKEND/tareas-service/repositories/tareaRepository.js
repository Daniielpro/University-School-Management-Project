const { tareasDB } = require('../index');
const Tarea = require('../models/Tarea')(tareasDB);

const obtenerTareas = () => Tarea.find();
const obtenerTareaPorId = (id) => Tarea.findById(id);
const crearTarea = (tareaData) => new Tarea(tareaData).save();
const actualizarTarea = (id, tareaData) => Tarea.findByIdAndUpdate(id, tareaData, { new: true });
const eliminarTarea = (id) => Tarea.findByIdAndDelete(id);

module.exports = { obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea };
