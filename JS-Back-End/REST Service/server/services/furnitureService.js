const Item = require('../models/Item');

async function getAll() {
    return Item.find({});
}

async function getById(id) {
    return Item.findById(id);
}

async function getByUserId(userId) {
    return Item.find({ _ownerId: userId });
}

async function createItem(data) {
    const item = await Item.create(data);

    return item;
}

async function updateItem(id, data) {
    const item = await Item.findById(id);

    item.make = data.make;
    item.model = data.model;
    item.year = data.year;
    item.description = data.description;
    item.price = data.price;
    item.img = data.img;
    item.material = data.material;

    return await item.save();
}

async function deleteItem(id) {
    return Item.findByIdAndDelete(id);
}

module.exports = { getAll, getById, getByUserId, createItem, updateItem, deleteItem };