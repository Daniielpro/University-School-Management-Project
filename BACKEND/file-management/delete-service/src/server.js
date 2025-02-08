const app = require('./app');

const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
    console.log(`🗑️ Servicio de eliminación corriendo en http://localhost:${PORT}`);
});
