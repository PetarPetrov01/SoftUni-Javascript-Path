const { Types } = require('mongoose');
const { Schema, model } = require('mongoose');


const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: true,
        minLength: [4, 'The Starting Point should be at least 4 characters long']
    },
    endPoint: {
        type: String,
        required: true,
        minLength: [4, 'The End Point should be at least 4 characters long']
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+$/, 'Invalid image URL']
    },
    carBrand: {
        type: String,
        required: true,
        minLength: [4, 'The Car Brand should be minimum 4 characters long.']
    },
    seats: {
        type: Number,
        required: true,
        min: [0, 'The Seats should be positive number (from 0 to 4 inclusive)'],
        max: [4, 'The Seats should be positive number (from 0 to 4 inclusive)']
    },
    price: {
        type: Number,
        required: true,
        min: [1, 'The Price should be positive number (from 1 to 50 inclusive)'],
        max: [50, 'The Price should be positive number (from 1 to 50 inclusive)']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'The Description should be minimum 10 characters long.']
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    },
    buddies: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const Trip = model('Trip', tripSchema);

module.exports = { Trip };
