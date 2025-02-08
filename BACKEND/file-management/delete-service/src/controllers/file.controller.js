const fs = require('fs');
const path = require('path');
const File = require('../models/file.model');

exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar el archivo en la base de datos
        const file = await File.findById(id);
        if (!file) {
            return res.status(404).json({ message: 'Archivo no encontrado en la base de datos' });
        }

        // 🔥 RUTA ABSOLUTA DIRECTA A `upload-service/src/uploads/`
        const uploadServicePath = path.resolve(__dirname, '../../../upload-service/src/uploads');
        const filePath = path.join(uploadServicePath, file.filename);

        console.log(`🗑 Eliminando archivo: ${filePath}`);

        // Verificar si el archivo existe antes de eliminarlo
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`✅ Archivo eliminado físicamente: ${file.filename}`);
        } else {
            console.log(`⚠️ El archivo no existe en uploads: ${file.filename}`);
        }

        // Eliminar el registro de la base de datos
        await File.findByIdAndDelete(id);

        res.status(200).json({ message: 'Archivo eliminado correctamente de la base de datos y del sistema' });
    } catch (error) {
        console.error('❌ Error al eliminar archivo:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.cleanDatabase = async (req, res) => {
    try {
        const files = await File.find();

        let deletedCount = 0;
        const uploadServicePath = path.resolve(__dirname, '../../../upload-service/src/uploads');

        for (const file of files) {
            const filePath = path.join(uploadServicePath, file.filename);
            if (!fs.existsSync(filePath)) {
                await File.findByIdAndDelete(file._id);
                deletedCount++;
            }
        }

        res.status(200).json({ message: `Se eliminaron ${deletedCount} archivos huérfanos de la base de datos.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
