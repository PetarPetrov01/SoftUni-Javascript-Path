const { Creature } = require('../models/Creature');

async function getAll() {
    return await Creature.find({}).lean();
}

async function getById(id) {
}

async function getByIdPopulated(id) {
}

async function create(data, ownerId) {

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