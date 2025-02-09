const express = require('express');
const router = express.Router();
const { maestrosDB } = require('../index');
const Maestro = require('../models/Maestro')(maestrosDB);


router.get('/', async (req, res) => {
    try {
        const profesores = await Maestro.find();
        res.json(profesores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los profesores' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const profesor = await Maestro.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({ error: 'Profesor no encontrado' });
        }
        res.json(profesor);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el profesor' });
    }
});


router.post('/', async (req, res) => {
    try {
        const { nombre, materia } = req.body;
        const nuevoProfesor = new Maestro({ nombre, materia });
        await nuevoProfesor.save();
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el profesor' });
    }
});

module.exports = router;
