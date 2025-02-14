const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento personalizado con nombre original
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        // Obtener el nombre original y reemplazar espacios por "_"
        const originalName = file.originalname.replace(/\s+/g, '_');

        // Agregar marca de tiempo para evitar duplicados
        const timestamp = Date.now();

        // Generar el nuevo nombre con la extensión original
        const filename = `${originalName}_${timestamp}${path.extname(file.originalname)}`;

        cb(null, filename);
    }
});

const upload = multer({ storage });

module.exports = upload;
