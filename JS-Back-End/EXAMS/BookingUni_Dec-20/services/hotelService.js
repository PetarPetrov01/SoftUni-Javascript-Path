const { Hotel } = require('../models/hotel');

async function getAll() {
    return (await Hotel.find({}).lean()).sort((a, b) => b.freeRooms - a.freeRooms);
}

async function getById(id) {
}

async function create(data, ownerId) {
}

async function update(id, data) {
}

async function deleteById(id) {
}

async function bookRoom(hotelId, userId) {
}

async function getUserBookings(userId) {
}

module.exports = {
    getAll, getById, create, update, deleteById, bookRoom, getUserBookings
};

