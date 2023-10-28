const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First name should be atleast 3 characters long']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, 'Last name should be atleast 3 characters long']
    },
    email: {
        type: String,
        required: true,
        minLength: [10, 'Email should be atleast 10 characters long']
        
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

/**
 * •	firstName – string (required)
•	lastName – string (required)
•	email – string (required)
•	password – string (required)
•	The first name is required and should be at least 3 characters long.
•	The last name is required and should be at least 3 characters long.
•	The email is required and should be at least 10 characters long.
•	The password is required and should be at least 4 characters long.
 */

const User = model('User', userSchema);

module.exports = { User };