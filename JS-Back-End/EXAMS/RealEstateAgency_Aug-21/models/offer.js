const { Schema, model, Types } = require('mongoose');

const offerSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [6, 'Name must be atleast 6 characters long']
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ['Apartment', 'Villa', 'House'],
            message: 'Invalid type (can be Apartment, Villa or House)'
        }
    },
    year: {
        type: Number,
        required: true,
        min: [1850, 'The Year should be between 1850 and 2021'],
        max: [2021, 'The Year should be between 1850 and 2021']
    },
    city: {
        type: String,
        required: true,
        minLength: [4, 'City should be atleast 4 characters long']
    },
    homeImage: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid home image URL']
    },
    description: {
        type: String,
        required: true,
        maxLength: [60, 'Property Description should be a maximum of 60 characters long']
    },
    available: {
        type: Number,
        required: true,
        min: [0, 'The Available Pieces should be positive number (from 0 to 10)'],
        max: [10, 'The Available Pieces should be positive number (from 0 to 10)']
    },
    tenants: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    createdAt: { type: Number }
});
/**
•	The Available Pieces should be positive number (from 0 to 10)

 */

const Offer = model('Offer', offerSchema);

module.exports = { Offer };