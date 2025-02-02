// Importar dependencias necesarias
const express = require('express');
const bodyParser = require('body-parser');

// Crear la aplicación Express
const app = express();

// Middleware para parsear el cuerpo de las peticiones JSON
app.use(bodyParser.json());

// Definir rutas para tu aplicación
// Ruta de ejemplo para crear una planificación
app.post('/planner', (req, res) => {
    const { title, date, description } = req.body;

    // Aquí puedes agregar la lógica para guardar la planificación en la base de datos
    if (!title || !date || !description) {
        return res.status(400).json({ error: 'Faltan datos en la solicitud' });
    }

    // Responder con éxito (esto es solo un ejemplo)
    res.status(201).json({
        message: 'Planificación creada con éxito',
        planner: { title, date, description }
    });
});

// Configuración del puerto en el que escuchará la aplicación
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
