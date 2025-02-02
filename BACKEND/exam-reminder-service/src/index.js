const express = require('express');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para procesar datos del formulario
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let lastDeletedExam = null;
let lastDeletion = false;

(async () => {
    const db = await connectDB();
    app.use('/api', reminderRoutes(db));
    
    // Ruta para mostrar la vista de recordatorios
    app.get('/', async (req, res) => {
        try {
            const [reminders] = await db.execute('SELECT * FROM reminders ORDER BY exam_date ASC');
            res.render('index', { reminders, lastDeletedExam });
            lastDeletedExam = null; // Limpiar el mensaje después de renderizar
        } catch (error) {
            console.error('Error al obtener recordatorios:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
    // Ruta para agregar un nuevo recordatorio desde la vista
    app.post('/add-reminder', async (req, res) => {
        try {
            const { exam_name, exam_date } = req.body;
            if (!exam_name || !exam_date) {
                return res.status(400).send('Todos los campos son obligatorios.');
            }
            await db.execute('INSERT INTO reminders (exam_name, exam_date) VALUES (?, ?)', [exam_name, exam_date]);
            res.redirect('/'); // Redirigir a la página principal después de agregar
        } catch (error) {
            console.error('Error al agregar el recordatorio:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
    // Ruta para verificar si se eliminó un recordatorio
    app.get('/check-deletion', (req, res) => {
        res.json({ deleted: lastDeletion });
        lastDeletion = false; // Resetear el estado después de ser leído
    });

    // Función para eliminar recordatorios vencidos
    const deleteExpiredReminders = async () => {
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const [expiredReminders] = await db.execute('SELECT * FROM reminders WHERE exam_date < ?', [now]);

            if (expiredReminders.length > 0) {
                await db.execute('DELETE FROM reminders WHERE exam_date < ?', [now]);
                lastDeletedExam = `Se eliminó el recordatorio "${expiredReminders[0].exam_name}" a las ${new Date().toLocaleTimeString()}`;
                lastDeletion = true; // Indicar que hubo una eliminación
                console.log(`🗑 ${lastDeletedExam}`);
            }
        } catch (error) {
            console.error('Error al eliminar recordatorios vencidos:', error);
        }
    };
    
    // Ejecutar la eliminación de recordatorios vencidos cada minuto
    setInterval(deleteExpiredReminders, 60 * 1000);
    
    app.listen(PORT, HOST, () => {
        console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
        console.log('📄 Documentación en: http://localhost:8080/api-docs');
        console.log('🖥 Vista en: http://localhost:8080/');
        console.log('⏳ Eliminación automática de recordatorios habilitada (cada 1 minuto)');
    });
})();




