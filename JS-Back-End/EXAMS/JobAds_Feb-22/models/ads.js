const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');


const AdSchema = new Schema({
    headline: {
        type: String,
        required: true,
        minLength: [4, 'The Headline should be a minimum of 4 characters long']
    },
    location: {
        type: String,
        required: true,
        minLength: [8, 'The Location should be a minimum of 8 characters long']
    },
    companyName: {
        type: String,
        required: true,
        minLength: [3, 'The Company name should be at least 3 characters long']
    },
    companyDescription: {
        type: String,
        required: true,
        maxLength: [40, 'The Company description should be a maximum of 40 characters long']
    },
    createdAt: {
        type: Number
    },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    applied: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const Ad = model('Ad', AdSchema);

module.exports = { Ad };
