const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(email, username, password) {
    const existingUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existingUsername) {
        throw new Error('Username is already taken!');
    }

    const existingEmail = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existingEmail) {
        throw new Error('This email already has an account!');
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

async function login(email, password) {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Email or password don\'t match!');
    }

    const match = bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Email or password don\'t match!');
    }

    return createSession(user);
}

function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email,
        username
    };

    const token = jwt.sign(payload, JWT_SECRET);

    return token;
}

function verifyToken(token) {

    const verify = jwt.verify(token, JWT_SECRET);
    return verify;
}


module.exports = { register, login, verifyToken };