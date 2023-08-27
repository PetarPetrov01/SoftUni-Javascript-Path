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
