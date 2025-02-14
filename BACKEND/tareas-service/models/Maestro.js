module.exports = (db) => {
    if (!db || typeof db.model !== 'function') {
        throw new Error("❌ La conexión a maestrosDB no está definida correctamente.");
    }

    const mongoose = require('mongoose');

    const MaestroSchema = new mongoose.Schema({
        nombre: { type: String, required: true },
        materia: { type: String, required: true }
    });

    
    return db.models.Maestro || db.model('Maestro', MaestroSchema);
};




