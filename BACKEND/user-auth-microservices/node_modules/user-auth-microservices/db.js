const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error en la conexión a la base de datos:', err);
        setTimeout(() => process.exit(1), 5000); // Reiniciar en caso de error
    } else {
        console.log('Conexión a la base de datos establecida');
        connection.release();
    }
});

module.exports = pool.promise();
