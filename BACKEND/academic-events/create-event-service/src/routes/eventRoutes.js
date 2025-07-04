const express = require('express');
const router = express.Router();
const { createEvent } = require('../controllers/eventController');

router.post('/events', createEvent); // 💡 Asegúrate de que esta ruta está definida

module.exports = router;
