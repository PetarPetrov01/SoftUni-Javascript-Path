const { Hotel } = require('../models/hotel');

async function getAll() {
    return (await Hotel.find({}).lean()).sort((a, b) => b.freeRooms - a.freeRooms);
}

async function getById(id) {
    return await Hotel.findById(id).lean();
}

async function create(data, ownerId) {

    const hotel = {
        name: data.name,
        city: data.city,
        freeRooms: data.freeRooms,
        imageUrl: data.imageUrl,
        owner: ownerId
    };

    await Hotel.create(hotel);
}

async function update(id, data) {
    console.log('Updating...');
    console.log(data);
    const hotel = await Hotel.findById(id);

    hotel.name = data.name;
    hotel.city = data.city;
    hotel.imageUrl = data.imageUrl;
    hotel.freeRooms = data.freeRooms;

    await hotel.save();
}

async function deleteById(id) {
    await Hotel.findByIdAndDelete(id);
}

async function bookRoom(hotelId, userId) {
    const hotel = await Hotel.findById(hotelId);
    console.log(hotel);

    if (hotel.bookedRooms.includes(userId)) {
        throw new Error('Cannot book twice!');
    }

    hotel.bookedRooms.push(userId);
    await hotel.save();

}

async function getUserBookings(userId) {
    return await Hotel.find({ bookedRooms: userId });
}

module.exports = {
    getAll, getById, create, update, deleteById, bookRoom, getUserBookings
};

