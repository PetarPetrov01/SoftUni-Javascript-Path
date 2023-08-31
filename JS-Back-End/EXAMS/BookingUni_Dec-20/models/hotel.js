const { Schema, model, Types } = require('mongoose');

const hotelSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 4
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/,'Invalid URL']
    },
    freeRooms: {
        type: Number,
        required: true,
        min: [1, 'Free room must be a number between 1 and 100'],
        max: [100, 'Free room must be a number between 1 and 100']
    },
    bookedRooms: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Hotel = model('Hotel', hotelSchema);

module.exports = { Hotel };