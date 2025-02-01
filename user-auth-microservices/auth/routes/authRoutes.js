const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Ruta protegida
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You are authenticated', user: req.user });
});

module.exports = router;