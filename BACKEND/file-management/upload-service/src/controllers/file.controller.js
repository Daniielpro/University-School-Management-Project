const File = require('../models/file.model');
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha subido ningún archivo" });
        }

        // Obtener el nombre del archivo generado por Multer
        const { filename, mimetype, size } = req.file;
        const filePath = `uploads/${filename}`; // Ruta relativa correcta

        console.log("📂 Guardando archivo en MongoDB:", filename);

        const newFile = new File({
            filename,
            path: filePath,
            mimetype,
            size
        });

        await newFile.save();

        res.status(201).json({ message: 'Archivo subido con éxito', file: newFile });
    } catch (error) {
        console.error('❌ Error al subir archivo:', error);
        res.status(500).json({ error: error.message });
    }
};
