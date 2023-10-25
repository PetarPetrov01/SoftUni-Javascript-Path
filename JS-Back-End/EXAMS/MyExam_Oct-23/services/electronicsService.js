const { Electronics } = require('../models/Electronics');
async function getAll() {
}
async function getById(id) {
}
async function create(data, ownerId) {

    const electronics = {
        name: data.name,
        type: data.type,
        damages: data.damages,
        image: data.image,
        description: data.description,
        production: Number(data.production),
        exploitation: Number(data.exploitation),
        price: Number(data.price),
        owner: ownerId
    };

    await Electronics.create(electronics);
}
async function edit(id, data) {
}
async function deleteById(id) {
}
async function buy(id, userId) {
}
module.exports = { getAll, getById, create, edit, deleteById, buy, search };