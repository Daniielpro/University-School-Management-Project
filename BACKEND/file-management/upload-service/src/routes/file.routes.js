const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/file.controller');
const upload = require('../config/multer'); // Importar la configuración de Multer

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;

