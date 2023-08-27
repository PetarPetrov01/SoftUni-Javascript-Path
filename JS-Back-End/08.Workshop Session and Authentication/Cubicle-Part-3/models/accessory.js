const { Schema, model, Types } = require('mongoose');

const accessoryShcema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true, validate: /^http|^https/ },
    description: { type: String, required: true, maxLength: 90 },
    cubes: { type: [Types.ObjectId], defaut: [], ref: 'Cube' }
});

const Accessory = model('Accessory', accessoryShcema);

module.exports = Accessory;