const express = require('express');
const router = express.Router();
const { updateEvent } = require('../controllers/eventController');

router.put('/events/:id', updateEvent);

module.exports = router;
