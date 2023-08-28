const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: [5, 'Username must be atleast 5 characters long (Only english letters and numbers are allowed)!'],
        match: [/^[a-zA-Z0-9]+$/,'Username must consist of english letters and numbers only!']
    },
    hashedPassword: {
        type: String,
        required: true,
    }
});

userSchema.index({ username: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = { User };