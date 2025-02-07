const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaController');

router.get('/', tareaController.obtenerTareas);
router.get('/:id', tareaController.obtenerTareaPorId);
router.post('/', tareaController.crearTarea);
router.put('/:id', tareaController.actualizarTarea);
router.delete('/:id', tareaController.eliminarTarea);

module.exports = router;
