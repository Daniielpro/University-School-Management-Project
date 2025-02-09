const express = require('express');
const router = express.Router();
const { deleteFile, cleanDatabase } = require('../controllers/file.controller');

router.delete('/delete/:id', deleteFile);
router.delete('/clean', cleanDatabase); 

module.exports = router;
