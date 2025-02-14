const addReminder = async (db, req, res) => {
    try {
        const { exam_name, exam_date } = req.body;
        if (!exam_name || !exam_date) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        await db.execute('INSERT INTO reminders (exam_name, exam_date) VALUES (?, ?)', [exam_name, exam_date]);
        res.status(201).json({ message: 'Recordatorio agregado correctamente' });
    } catch (error) {
        console.error('❌ Error al agregar recordatorio:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } 
};

const getReminders = async (db, req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM reminders');
        res.status(200).json(rows);
    } catch (error) {
        console.error('❌ Error al obtener recordatorios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { addReminder, getReminders };