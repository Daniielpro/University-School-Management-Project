const express = require('express');
const router = express.Router();
const { saveLink, getLinks } = require('../controllers/link.controller');

router.post('/save', saveLink);
router.get('/', getLinks); 

module.exports = router;