const { Crypto } = require('../models/crypto');

async function getAll() {
    return await Crypto.find({}).lean();
}

async function getById(id) {
    return await Crypto.findById(id).lean();
}

async function create(data, ownerId) {

    const crypto = {
        name: data.name,
        imageUrl: data.imageUrl,
        price: data.price,
        description: data.description,
        paymentMethod: data.paymentMethod,
        owner: ownerId
    };

    await Crypto.create(crypto);
}

async function edit(id, data) {

}
async function deleteById(id) {
}
async function buy(id, userId) {

}
async function search(name, paymentMethod) {
}

module.exports = { getAll, getById, create, edit, deleteById, buy, search };