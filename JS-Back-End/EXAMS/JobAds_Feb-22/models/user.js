const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Invalid email address.']
    },
    hashedPassword: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: [40, 'The description of skills should be a maximum of 40 characters long']
    },
    ownAds: {
        type: [Types.ObjectId],
        ref: 'Ad',
        default: []
    }
});
/**
 * •	Email - string (required),
•	Password - string (required),
•	Description of skills - string (required),
•	My ads - a collection of Ads (a reference to the Ad Model)

 */

const User = model('User', userSchema);

module.exports = { User };