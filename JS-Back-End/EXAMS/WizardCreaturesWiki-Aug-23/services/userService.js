const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(firstName, lastName, email, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        email,
        hashedPassword
    });

    // TODO Check assignment if register creates session
    const token = createSession(user);
    return token;
}

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Email or password don\'t match!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Email or password don\'t match!');
    }

    return createSession(user);
}

function createSession({ _id, firstName, lastName, email }) {
    const payload = {
        _id,
        firstName,
        lastName,
        email
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = { register, login, verifyToken };