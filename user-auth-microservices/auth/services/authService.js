const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class AuthService {
    static async registerUser(username, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.createUser(username, email, hashedPassword);
        return userId;
    }

    static async loginUser(email, password) {
        const user = await User.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return user;
    }
}

module.exports = AuthService;