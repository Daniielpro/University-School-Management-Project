const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const authRoutes = require('./auth/routes/authRoutes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', 
    credentials: true
}));


app.use(express.json());


app.use('/auth', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const frontendPath = path.join(__dirname, '../frontend/public');

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    if (!req.path.startsWith('/auth') && !req.path.startsWith('/api')) {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});


app.listen(PORT, () => {
    console.log(`Auth service ejecutándose en: http://localhost:${PORT}`);
});
