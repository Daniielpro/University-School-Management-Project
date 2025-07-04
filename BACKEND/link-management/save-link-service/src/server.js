const app = require('./app');

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
    console.log(`Servicio de guardar corriendo en http://localhost:${PORT}`);
});