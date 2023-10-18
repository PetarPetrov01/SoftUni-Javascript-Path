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

    const crypto = await Crypto.findById(id);

    crypto.name = data.name;
    crypto.imageUrl = data.imageUrl;
    crypto.price = data.price;
    crypto.description = data.description;
    crypto.paymentMethod = data.paymentMethod;

    await crypto.save();
}

async function deleteById(id) {
    await Crypto.findByIdAndDelete(id);
}

async function buy(id, userId) {
    const crypto = await Crypto.findById(id);

    if (crypto.bought.includes(userId)) {
        throw new Error('You can\'t buy this coin twice');
    }

    if (crypto.bought.owner == userId) {
        throw new Error('You can\'t buy your own coin');
    }

    crypto.bought.push(userId);
    await crypto.save();
}

async function search(name, paymentMethod) {
    console.log(name);
    console.log(paymentMethod);
    return await Crypto.find({
        $and: [
            { name: { $regex: new RegExp(name, 'i') } },
            { paymentMethod: { $regex: new RegExp(paymentMethod, 'i') } }]
    }).lean();
}

module.exports = { getAll, getById, create, edit, deleteById, buy, search };