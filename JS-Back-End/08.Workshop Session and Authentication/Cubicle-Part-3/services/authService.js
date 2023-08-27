const bcrypt = require('bcrypt');
const User = require('../models/user');

async function register(username, password) {
    const existing = await User.findOne({ username: username });

    if (existing) {
        throw new Error('Username is already taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        hashedPassword
    });

    return {
        username: user.username,
        _id: user._id
    };
}

async function login(username, password) {
    console.log('Logging in...');
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Incorect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);
    if (!match) {
        throw new Error('Incorect username or password');
    }

    return {
        username: user.username,
        _id: user._id
    };
}

module.exports = { login, register };