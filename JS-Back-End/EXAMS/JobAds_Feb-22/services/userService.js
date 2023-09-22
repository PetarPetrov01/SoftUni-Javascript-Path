const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(email, password, description) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        description
    });

    // TODO Check assignment if register creates session
    const token = createSession(user);
    return token;
}
