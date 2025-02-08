const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const authRoutes = require('./auth/routes/authRoutes');
const dotenv = require('dotenv');
const logger = require('./utils/logger');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Permitir solicitudes de cualquier origen
    credentials: true
}));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// 📌 Rutas API (deben ir antes de servir el frontend)
app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 📌 Servir el frontend desde la carpeta `frontend` (sin necesidad de otro servidor)
const frontendPath = path.join(__dirname, '../frontend/public');

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/auth') && !req.path.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Auth service ejecutándose en: http://localhost:${PORT}`);
});
