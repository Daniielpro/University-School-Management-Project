const express = require('express');
const router = express.Router();
const { deleteFile, cleanDatabase } = require('../controllers/file.controller');

router.delete('/delete/:id', deleteFile);
router.delete('/clean', cleanDatabase); // Nueva ruta para limpiar la base de datos

module.exports = router;
