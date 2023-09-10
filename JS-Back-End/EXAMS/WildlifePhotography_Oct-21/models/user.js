const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, 'First Name must be atleast 3 characters long!'],
        match: [/^[a-zA-Z]+$/i, 'firstName must can contain only English letters']
    },
    lastName: {
        type: String,
        required: true,
        minLength: [5, 'Last Name must be atleast 5 characters long!'],
        match: [/^[a-zA-Z]+$/i, 'firstName must can contain only English letters']
    },
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid email']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    myPosts: {
        type: [Types.ObjectId],
        ref: 'Post',
        default: []
    }
});
/* 
•	First Name - string (required),
•	Last Name - string (required),
•	Email - string (required),
•	Password - string (required),
•	My Posts - a collection of Post (a reference to the Post Model)
*/

const User = model('User', userSchema);

module.exports = { User };