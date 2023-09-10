const { Schema, model, Types } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [6, 'Title and keyword must be atleast 6 characters long']
    },
    keyword: {
        type: String,
        required: true,
        minLength: [6, 'Title and Keyword must be atleast 6 characters long']
    },
    location: {
        type: String,
        required: true,
        maxLength: [15, 'Location must be no more than 15 characters long']
    },
    dateOfCreation: {
        type: String,
        required: true,
        match: [/^[\d]{2}\.[\d]{2}\.[\d]{4}$/, 'Invalid date']
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid image URL']
    },
    description: {
        type: String,
        required: true,
        minLength: [8, 'Description must be atleast 8 characters long']
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    votes: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    rating: {
        type: Number,
        default: 0
    }
});
/* 
•	Title - string (required),
•	Keyword - string (required),
•	Location - string (required),
•	Date of creation - string (required),
•	Image - string (required),
•	Description - string (required),
•	Author - object Id (a reference to the User model),
•	Votes on post - a collection of Users (a reference to the User model),
•	Rating of post - number, default value 0
*/

const Post = model('Post', postSchema);

module.exports = { Post };