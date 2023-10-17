const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'The username should be at least five characters long']
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'The email should be at least ten characters long']
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

/**
 * •	The username should be at least five characters long
•	The email should be at least ten character long
•	The password should be at least four characters long
•	The repeat password should be equal to the password

 */

userSchema.index({ email: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);

module.exports = { User };