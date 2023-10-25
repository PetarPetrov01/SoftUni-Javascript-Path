const { Schema, model, Types } = require('mongoose');


const electronicsSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [10, 'The name should be atleast 10 characters']
    },
    type: {
        type: String,
        required: true,
        minLength: [2, 'The type should be atleast 2 characters']
    },
    damages: {
        type: String,
        required: true,
        minLength: [10, 'Damages should be atleast 10 characters']
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid image URL']
    },
    description: {
        type: String,
        required: true,
        validate: [validateDescription, 'The description should be between 10 and 200 characters.']
    },
    production: {
        type: Number,
        required: true,
        validate: [validateYear, 'The year should be between 1900 and 2023.']
    },
    exploitation: {
        type: Number,
        required: true,
        min: [0.01,'exploitation should be a positive number']
    },
    price: {
        type: Number,
        required: true,
        min: [0.01,'price should be a positive number']
    },
    buyingList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref:'User'
    }

});

function validateDescription(value) {
    return value.length >= 10 && value.length <= 200;
}

function validateYear(value) {
    return value >= 1900 && value <= 2023;
}


const Electronics = model('Electronics', electronicsSchema);

module.exports = { Electronics };
