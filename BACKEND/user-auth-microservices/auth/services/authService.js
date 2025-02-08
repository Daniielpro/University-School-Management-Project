const logger = require('../../utils/logger');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');  // ✅ Importa correctamente User
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class AuthService {
    static async registerUser(username, email, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userId = await User.createUser(username, email, hashedPassword);
            logger.info(`Usuario registrado: ${email}`);
            return userId;
        } catch (error) {
            logger.error(`Error en registro: ${error.message}`);
            throw error;
        }
    }

    static async loginUser(email, password) {
        try {
            const user = await User.findUserByEmail(email);
            if (!user) {
                logger.warn(`Intento de login fallido - usuario no encontrado: ${email}`);
                throw new Error('User not found');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                logger.warn(`Intento de login fallido - contraseña incorrecta: ${email}`);
                throw new Error('Invalid password');
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            logger.info(`Usuario autenticado: ${email}`);
            return { user, token };
        } catch (error) {
            logger.error(`Error en login: ${error.message}`);
            throw error;
        }
    }
}

module.exports = AuthService;
