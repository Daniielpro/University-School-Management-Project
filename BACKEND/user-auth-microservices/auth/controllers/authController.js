const AuthService = require('../services/authService');

class AuthController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;
            const userId = await AuthService.registerUser(username, email, password);
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.loginUser(email, password);
            res.status(200).json({ message: 'Login successful', user, token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }
}

module.exports = AuthController;