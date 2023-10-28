const { Schema, model, Types } = require('mongoose');

const creatureSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'The name should be atleast 2 characters long']
    },
    species: {
        type: String,
        required: true,
        minLength: [3, 'Species should be atleast 3 characters long']
    },
    skinColor: {
        type: String,
        required: true,
        minLength: [3, 'Skin color should be atleast 3 characters long']
    },
    eyeColor: {
        type: String,
        required: true,
        minLength: [3, 'Eye color should be atleast 3 characters long']
    },
    imageUrl: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Invalid image URL']
    },
    description: {
        type: String,
        required: true,
        validate: [validateDescription, 'Description should be at least 5 and no longer than 500 characters']
    },
    votes: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    ownerId: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

function validateDescription(value) {
    return value.length >= 5 && value.length <= 500;
};

const Creature = model('Creature', creatureSchema);

module.exports = { Creature };
