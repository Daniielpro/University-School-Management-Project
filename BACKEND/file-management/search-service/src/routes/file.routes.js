const express = require('express');
const router = express.Router();
const { getFiles } = require('../controllers/file.controller');

router.get('/', getFiles);

module.exports = router;
