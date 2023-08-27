const { Schema, model, Types } = require('mongoose');

const URL_REGEX = /^https?:\/\/.*/i;

const cubeModel = new Schema({
    name: { type: String, minLength: 5 },
    description: { type: String, minLength: 20 },
    imageUrl: {
        type: String,
        validate: {
            validator: (value) => URL_REGEX.test(value),
            message: (prop) => `${prop.value} is not a valid image Url`
        }
    },
    difficultyLevel: { type: Number, min: 1, max: 6 },
    accessories: { type: [Types.ObjectId], default: [], ref: 'Accessory' },
    ownerId: { type: Types.ObjectId, ref: 'User', required: true }
});

const Cube = model('Cube', cubeModel);

module.exports = Cube;