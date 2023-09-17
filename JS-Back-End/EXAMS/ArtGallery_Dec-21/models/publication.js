const { Schema, model, Types } = require('mongoose');

const publicationSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [6, 'The Title should be a minimum of 6 characters long']
    },
    technique: {
        type: String,
        required: true,
        maxLength: [15, 'The Painting technique should be a maximum of 15 characters long']
    },

    artPicture: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid picture URL']
    },
    authenticity: {
        type: String,
        required: true,
        enum:
        {
            values: ['Yes', 'No'],
            message: 'The Certificate of authenticity must be either "Yes" or "No".'
        }
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    usersShared: {
        type: [Types.ObjectId],
        ref: 'User'
    }
});

/**
•	The Title should be a minimum of 6 characters long.
•	The Painting technique should be a maximum of 15 characters long.
•	The Certificate of authenticity there must be value "Yes" or "No".
•	The Art picture should start with http:// or https://.
 */

const Publication = model('Publication', publicationSchema);

module.exports = { Publication };