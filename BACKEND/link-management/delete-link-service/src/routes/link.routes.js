const express = require('express');
const router = express.Router();
const { deleteLink } = require('../controllers/link.controller');

router.delete('/delete/:id', deleteLink);

module.exports = router; 