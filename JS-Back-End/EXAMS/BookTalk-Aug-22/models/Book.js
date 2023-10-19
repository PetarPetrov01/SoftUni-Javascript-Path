const { Schema, model, Types } = require('mongoose');

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, 'The Title should be at least 2 characters']
    },
    author: {
        type: String,
        required: true,
        minLength: [5, 'The Title should be at least 2 characters']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid image URL']
    },
    review: {
        type: String,
        required: true,
        minLength: [10, 'The Review should be a minimum of 10 characters long']
    },
    genre: {
        type: String,
        required: true,
        minLength: [3, 'The Genre should be at least 3 characters']
    },
    stars: {
        type: Number,
        required: true,
        validate: [validateNumber, 'The Stars should be a positive number between 1 and 5']
    },
    wishingList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

function validateNumber(value) {
    return value >= 1 && value <= 5;
};

/*
•	Stars: Number (required) between 1 and 5,
•	Owner - object Id (a reference to the User model)
*/
/*
•	The Stars should be a positive number between 1 and 5
 */

const Book = model('Book', BookSchema);

module.exports = { Book };
