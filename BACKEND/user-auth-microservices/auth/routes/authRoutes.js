const express = require('express');
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/userModel'); 

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You are authenticated', user: req.user });
});


router.get('/users', async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
