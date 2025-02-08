const app = require('./app');

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`📂 Servicio de subida corriendo en http://localhost:${PORT}`);
});
