const bcrypt = require('bcrypt');
const User = require('../models/userModel');  
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    static async registerUser(username, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.createUser(username, email, hashedPassword);
            console.log(`Usuario registrado: ${email}`);
            return userId;
        } catch (error) {
            console.error(`Error en registro: ${error.message}`);
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const user = await User.findUserByEmail(email);
            if (!user) {
                console.warn(`Intento de login fallido - usuario no encontrado: ${email}`);
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                console.warn(`Intento de login fallido - contraseña incorrecta: ${email}`);
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            console.log(`Usuario autenticado: ${email}`);
            return { user, token };
        } catch (error) {
            console.error(`Error en login: ${error.message}`);
            throw error;
        }
    }
}

module.exports = AuthService;
