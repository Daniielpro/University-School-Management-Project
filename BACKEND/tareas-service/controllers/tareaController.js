const { maestrosDB } = require('../index');  
const Maestro = require('../models/Maestro')(maestrosDB);  
const TareaRepository = require('../repositories/tareaRepository');

const obtenerTareas = async (req, res) => {
    const tareas = await TareaRepository.obtenerTareas();
    res.json(tareas);
};

const obtenerTareaPorId = async (req, res) => {
    const tarea = await TareaRepository.obtenerTareaPorId(req.params.id);
    tarea ? res.json(tarea) : res.status(404).json({ error: 'Tarea no encontrada' });
};

const crearTarea = async (req, res) => {
    try {
        const { tarea, fechaEntrega, profesor } = req.body;

        
        const profesorExiste = await Maestro.findOne({ nombre: profesor });

        if (!profesorExiste) return res.status(400).json({ error: 'El nombre del profesor no es válido' });

        
        const nuevaTarea = await TareaRepository.crearTarea({ tarea, fechaEntrega, profesor });
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear tarea' });
    }
};

const actualizarTarea = async (req, res) => {
    const tareaActualizada = await TareaRepository.actualizarTarea(req.params.id, req.body);
    tareaActualizada ? res.json(tareaActualizada) : res.status(404).json({ error: 'Tarea no encontrada' });
};

const eliminarTarea = async (req, res) => {
    await TareaRepository.eliminarTarea(req.params.id);
    res.status(204).send();
};

module.exports = { obtenerTareas, obtenerTareaPorId, crearTarea, actualizarTarea, eliminarTarea };
