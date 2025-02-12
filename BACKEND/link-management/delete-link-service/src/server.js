const app = require('./app');

const PORT = process.env.PORT || 8086;
app.listen(PORT, () => {
    console.log(`Servicio de eliminar corriendo en http://3.218.222.100:${PORT}`); 
});  