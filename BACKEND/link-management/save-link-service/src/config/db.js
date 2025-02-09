const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') }); 
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("🔍 Cargando variables de entorno...");
        console.log("🔍 MONGO_URI:", process.env.MONGO_URI); 

        if (!process.env.MONGO_URI) {
            throw new Error("❌ La variable MONGO_URI no está definida en .env");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB conectado correctamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;

