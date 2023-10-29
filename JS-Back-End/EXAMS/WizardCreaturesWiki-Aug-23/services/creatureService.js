const { Creature } = require('../models/Creature');

async function getAll() {
    return await Creature.find({}).lean();
}

async function getById(id) {
    return await Creature.findById(id).lean();
}

async function getByIdPopulated(id) {
}

async function create(data, ownerId) {

    const creature = {
        name: data.name,
        species: data.species,
        skinColor: data.skinColor,
        eyeColor: data.eyeColor,
        imageUrl: data.imageUrl,
        description: data.description,
        ownerId
    };

    await Creature.create(creature);
}

async function edit(id, data) {
}

async function deleteById(id) {
}

async function vote(id, userId) {
}

async function getOwn(userId) {
}
module.exports = { getAll, getById, create, edit, deleteById, getByIdPopulated, vote,getOwn };