const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$/i},
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
});

//•	Email - string (required), unique
userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = { User };