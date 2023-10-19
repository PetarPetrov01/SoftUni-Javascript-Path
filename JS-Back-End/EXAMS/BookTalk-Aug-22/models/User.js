const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, 'The username should be at least 4 characters long']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: [10, 'The email should be at least 10 characters long']
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

/**
 •	The username should be at least 4 characters long
•	The email should be at least 10 characters long
•	The password should be at least 3 characters long
•	The repeat password should be equal to the password
*/

const User = model('User', userSchema);

module.exports = { User };