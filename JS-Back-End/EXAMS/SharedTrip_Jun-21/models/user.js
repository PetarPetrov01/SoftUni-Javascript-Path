const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [/^\w+@\w+\.[a-zA-Z]+$/,'Invalid email']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female'],
            message: 'Invalid gender'
        }
    },
    tripsHistroy: {
        type: [Types.ObjectId],
        ref: 'Trip',
        default: []
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