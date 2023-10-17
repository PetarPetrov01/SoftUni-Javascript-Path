const { Schema, model, Types } = require('mongoose');


const cryptoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name should be at least 2 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/https?:\/\/.+/, 'Invalid image Url']
    },
    price: {
        type: [Number, 'Price should be a positive number'],
        required: true,
        min: [0, 'Price should be a positive number']
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters long']
    },
    paymentMethod: {
        type: String,
        enum: {
            values: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
            message: 'Payment Method should be one of the options (Crypto Wallet, Credit Card, Debit Card, paypal)'
        }
    },
    bought: {
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

/**
•	Name - String (required),
•	Image: String (required),
•	Price: Number (required),
•	Crypto Description: String (required),
•	Payment Method: String (crypto-wallet, credit-card, debit-card, paypal) required,
•	Buy a crypto - a collection of Users (a reference to the User model)
•	Owner - object Id (a reference to the User model)

•	The Crypto Image should start with http:// or https://.

 */
const Crypto = model('Crypto', cryptoSchema);

module.exports = { Crypto };
