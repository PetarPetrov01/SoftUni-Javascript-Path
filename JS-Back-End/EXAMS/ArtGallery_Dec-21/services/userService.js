const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(username, password, address) {
    const existing = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Username is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        hashedPassword,
        address
    });

    // TODO Check assignment if register creates session
    const token = createSession(user);
    return token;
}

async function login(username, password) {
    const user = await User.findOne({ username }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Username or password don\'t match!');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Username or password don\'t match!');
    }

    return createSession(user);
}

function createSession({ _id, username }) {
    const payload = {
        _id,
        username
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

async function getUser(id) {
    return User.findById(id).lean();
}


module.exports = { register, login, verifyToken, getUser };