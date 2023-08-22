const { Schema, model, Types } = require('mongoose');

const cubeModel = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, maxLength: 200 },
    imageUrl: { type: String, required: true, validate: /^http|^https/ },
    difficultyLevel: { type: Number, required: true, min: 1, max: 6 },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory' }
})

const Cube = model('Cube', cubeModel)

module.exports = Cube;