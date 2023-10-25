const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');

const JWT_SECRET = 'asdasd1eas213rsa';

async function register(email, username, password) {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('email is already taken!');
    }

    //No requiremnt for unique usernames according to assignment??
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        username,
        hashedPassword
    });

    const token = createSession(user);
    return token;
}
function createSession({ _id, email, username }) {
    const payload = {
        _id,
        email, 
        username
    };

    return jwt.sign(payload, JWT_SECRET);
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}


module.exports = { register, login, verifyToken };