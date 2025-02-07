const app = require('./app');

const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
    console.log(`Servicio de eliminar corriendo en http://localhost:${PORT}`);
});