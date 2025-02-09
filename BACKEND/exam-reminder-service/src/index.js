const express = require('express');
const connectDB = require('./config/db');
const reminderRoutes = require('./routes/reminderRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./docs/swagger');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8081
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let lastDeletedExam = null;
let lastDeletion = false;

(async () => {
    const db = await connectDB();
    app.use('/api', reminderRoutes(db));
    
   
    app.get('/', async (req, res) => {
        try {
            const [reminders] = await db.execute('SELECT * FROM reminders ORDER BY exam_date ASC');
            res.render('index', { reminders, lastDeletedExam });
            lastDeletedExam = null; 
        } catch (error) {
            console.error('Error al obtener recordatorios:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
    
    app.post('/add-reminder', async (req, res) => {
        try {
            const { exam_name, exam_date } = req.body;
            if (!exam_name || !exam_date) {
                return res.status(400).send('Todos los campos son obligatorios.');
            }
            await db.execute('INSERT INTO reminders (exam_name, exam_date) VALUES (?, ?)', [exam_name, exam_date]);
            res.redirect('/'); 
        } catch (error) {
            console.error('Error al agregar el recordatorio:', error);
            res.status(500).send('Error interno del servidor');
        }
    });
    
    
    app.get('/check-deletion', (req, res) => {
        res.json({ deleted: lastDeletion });
        lastDeletion = false; 
    });

    
    const deleteExpiredReminders = async () => {
        try {
            const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const [expiredReminders] = await db.execute('SELECT * FROM reminders WHERE exam_date < ?', [now]);

            if (expiredReminders.length > 0) {
                await db.execute('DELETE FROM reminders WHERE exam_date < ?', [now]);
                lastDeletedExam = `Se eliminó el recordatorio "${expiredReminders[0].exam_name}" a las ${new Date().toLocaleTimeString()}`;
                lastDeletion = true; 
                console.log(`🗑 ${lastDeletedExam}`);
            }
        } catch (error) {
            console.error('Error al eliminar recordatorios vencidos:', error);
        }
    };
    
    
    setInterval(deleteExpiredReminders, 60 * 1000);
    
    app.listen(PORT, HOST, () => {
        console.log(`🚀 Servidor corriendo en http://${HOST}:${PORT}`);
        console.log('📄 Documentación en: http://localhost:8081/pi-docs');
        console.log('🖥 Vista en: http://localhost:8081');
        console.log('⏳ Eliminación automática de recordatorios habilitada (cada 1 minuto)');
    });
})();




