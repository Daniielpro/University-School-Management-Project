const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'exam_reminders'
};

const connectDB = async () => {
    try {
        const db = await mysql.createConnection(dbConfig);
        console.log('✅ Conectado a la base de datos');
        await db.execute(`
            CREATE TABLE IF NOT EXISTS reminders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                exam_name VARCHAR(255) NOT NULL,
                exam_date DATETIME NOT NULL
            )
        `);
        console.log('✅ Tabla "reminders" verificada');
        return db;
    } catch (error) {
        console.error('❌ Error conectando a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB;