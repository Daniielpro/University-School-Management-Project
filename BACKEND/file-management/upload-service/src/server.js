const app = require('./app');

const PORT = process.env.PORT || 8088;
app.listen(PORT, () => {
    console.log(`📂 Servicio de subida corriendo en http://23.23.90.47:${PORT}`);
});
