const { Schema, model, Types } = require('mongoose');

const furnitureSchema = new Schema({
    make: { type: String, required: true, minLength: [4, 'Make must be atleast 4 characters long'] },
    model: { type: String, required: true, minLength: [4, 'Model must be atleast 4 characters long'] },
    year: {
        type: Number, required: true, validate: {
            validator: value => value >= 1950 && value <= 2050,
            message: 'Year must be between 1950 and 2050'
        }
    },
    description: { type: String, required: true, minLength: [10, 'Description must be atleast 10 characters long'] },
    price: { type: Number, required: true, min: [0.01, 'Price must be a positive number'] },
    img: { type: String, required: [true, 'Image url is required'] },
    material: { type: String, default: '' },
    _ownerId: { type: Types.ObjectId, ref: 'User' }
});

const Item = model('Item', furnitureSchema);

module.exports = Item;