const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, minlenght: [5, 'User name must be atleast 5 characters long.'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = User;