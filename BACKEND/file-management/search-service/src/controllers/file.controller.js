const fs = require('fs');
const path = require('path');
const File = require('../models/file.model');


exports.getFiles = async (req, res) => {
    try {
        const files = await File.find();
        const validFiles = [];

        
        const uploadServicePath = path.resolve(__dirname, '../../../upload-service/src/uploads');

        for (const file of files) {
            
            const filePath = path.join(uploadServicePath, file.filename);

            console.log(`🔍 Buscando archivo en ruta corregida: ${filePath}`);

            if (fs.existsSync(filePath)) {
                console.log(`✅ Archivo encontrado: ${file.filename}`);
                validFiles.push(file);
            } else {
                console.log(`⚠️ Archivo no encontrado en uploads: ${file.filename}`);
            }
        }

        res.status(200).json(validFiles);
    } catch (error) {
        console.error("❌ Error al obtener archivos:", error);
        res.status(500).json({ error: error.message });
    }
};


