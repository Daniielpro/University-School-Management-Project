module.exports = (db) => {
    const mongoose = require('mongoose');

    const TareaSchema = new mongoose.Schema({
        tarea: { type: String, required: true },
        fechaEntrega: { type: Date, required: true },
        profesor: { type: String, required: true } 
    });

    return db.model('Tarea', TareaSchema);
};

 