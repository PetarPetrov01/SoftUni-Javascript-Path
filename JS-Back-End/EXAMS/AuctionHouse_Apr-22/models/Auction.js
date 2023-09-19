const { Schema, model, Types } = require('mongoose');


const auctionSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [4, 'Ttile should be a minimum of 4 characters long']
    },
    description: {
        type: String,
        required: true,
        maxLength: [200, 'Description should be a maximum of 200 characters long']
    },
    category: {
        type: String,
        required: true,
        enum: {
            values: ['Vehicles', 'Real Estate', 'Electronics', 'Furniture', 'Other'], //To match the options in create.hbs
            message: 'The category should be one of the following: Vehicles, Real Estate, Electronics, Furniture, Other'
        }
    },
    imageUrl: {
        type: String,
        //Not required nor validated according to assignment!!!
    },
    price: {
        type: Number,
        required: true,
        min: [0.01, 'Price must a positive number']
    },
    author: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bidder: {
        type: Types.ObjectId,
        ref: 'User'
    },
    closed: {
        type: Boolean,
        default: false
    }

});

const Auction = model('Auction', auctionSchema);

module.exports = { Auction };
