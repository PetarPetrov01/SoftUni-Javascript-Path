const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(email, password, gender) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('This email is already linked to an account.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        gender
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

function createSession({ _id, email }) {
    const payload = {
        _id,
        email
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

async function getUser(id) {
    return await User.findById(id).lean();
}


module.exports = { register, login, verifyToken, getUser };