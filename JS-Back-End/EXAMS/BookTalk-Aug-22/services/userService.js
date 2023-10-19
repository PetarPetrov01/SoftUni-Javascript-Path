const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const JWT_SECRET = 'aso1ejfpd21eas213rsa';

async function register(email, username, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('email is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    // TODO Check assignment if register creates session
    const token = createSession(user);
    return token;
}
