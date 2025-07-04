const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/file.controller');
const upload = require('../config/multer'); 

router.post('/upload', upload.single('file'), uploadFile);

module.exports = router;

