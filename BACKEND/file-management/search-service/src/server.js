const app = require('./app');

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`🔎 Servicio de búsqueda corriendo en http://localhost:${PORT}`);
});
