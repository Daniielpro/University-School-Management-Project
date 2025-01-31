const express = require('express');
const { createActivity } = require('../controllers/activityController');

const router = express.Router();

// Ruta para crear una actividad
router.post('/activities', createActivity);

module.exports = router;