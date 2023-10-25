const { Electronics } = require('../models/Electronics');

async function getAll() {
    return await Electronics.find({}).lean();
}

async function getById(id) {
    return await Electronics.findById(id).lean();
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
    const electronics = await Electronics.findById(id);

    electronics.name = data.name;
    electronics.type = data.type;
    electronics.damages = data.damages;
    electronics.image = data.image;
    electronics.description = data.description;
    electronics.production = Number(data.production);
    electronics.exploitation = Number(data.exploitation);
    electronics.price = Number(data.price);

    await electronics.save();
}

async function deleteById(id) {
    await Electronics.findByIdAndDelete(id);
}

async function buy(id, userId) {
    const electronics = await Electronics.findById(id);

    //The assignemnt doesn't say whether buying second time should be protected ???
    if (electronics.buyingList.some(boughtId => boughtId == userId)) {
        throw new Error('You already bought this product');
    }

    if (electronics.owner == userId) {
        throw new Error('You can\'t buy your own product');
    }

    electronics.buyingList.push(userId);

    await electronics.save();
}
module.exports = { getAll, getById, create, edit, deleteById, buy, search };