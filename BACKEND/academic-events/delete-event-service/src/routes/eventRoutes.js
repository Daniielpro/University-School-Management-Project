const express = require('express');
const router = express.Router();
const { deleteEvent } = require('../controllers/eventController');

router.delete('/events/:id', deleteEvent);

module.exports = router;
