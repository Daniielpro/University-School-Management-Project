const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            console.warn('Acceso denegado - No se proporcionó un token');
            return res.status(401).json({ error: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        console.log(`Token verificado correctamente para usuario: ${decoded.email}`);
        next();
    } catch (error) {
        console.error(`Error en autenticación: ${error.message}`);
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
