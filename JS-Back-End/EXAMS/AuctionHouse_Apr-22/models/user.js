const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid email address']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        minLength: [1, 'First and Last name must be atleast 1 character long']
    },
    lastName: {
        type: String,
        minLength: [1, 'First and Last name must be atleast 1 character long']
    }
});

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = { User };