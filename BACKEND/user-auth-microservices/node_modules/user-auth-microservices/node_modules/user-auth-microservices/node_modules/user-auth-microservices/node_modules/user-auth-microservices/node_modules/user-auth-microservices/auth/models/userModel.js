const db = require('../../db');

class User {
    static async createUser(username, email, password) {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password]
        );
        return result.insertId;
    }

    static async findUserByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async getAllUsers() {
        const [rows] = await db.query('SELECT id, username, email FROM users'); // No devolver la contraseña
        return rows;
    }
}

module.exports = User;
