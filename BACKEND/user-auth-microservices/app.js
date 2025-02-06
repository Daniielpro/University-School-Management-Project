const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const authRoutes = require('./auth/routes/authRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Define app first
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend'))); 

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Auth routes
app.use('/auth', authRoutes);

// Ruta por defecto para servir 'index.html' desde 'frontend'
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'frontend', 'index.html'); 
    console.log('Buscando index.html en:', filePath); 
    res.sendFile(filePath);
});



// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
