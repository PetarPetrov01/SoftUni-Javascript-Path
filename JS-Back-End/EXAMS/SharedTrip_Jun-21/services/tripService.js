const { Trip } = require('../models/trip');

async function getAll() {
    return await Trip.find({}).lean();
}

async function getById(id) {
    return await Trip.findById(id).lean().populate('buddies creator');
}

async function createTrip(data, userId) {

    const trip = {
        startPoint: data.startPoint,
        endPoint: data.endPoint,
        date: data.date,
        time: data.time,
        carImage: data.carImage,
        carBrand: data.carBrand,
        seats: Number(data.seats),
        price: Number(data.price),
        description: data.description,
        creator: userId,
    };

    await Trip.create(trip);
}

async function editTrip(id, data, userId) {

    const trip = await Trip.findById(id);

    if (trip.creator._id != userId) {
        console.log('You can\'t edit someone else\'s trip');
    }

    trip.startPoint = data.startPoint;
    trip.endPoint = data.endPoint;
    trip.date = data.date;
    trip.time = data.time;
    trip.carImage = data.carImage;
    trip.carBrand = data.carBrand;
    trip.seats = Number(data.seats);
    trip.price = Number(data.price);
    trip.description = data.description;

    await trip.save();
}

async function joinTrip(id, userId) {
    const trip = await Trip.findById(id);

    if (trip.creator == userId) {
        throw new Error('The creator cannot join his own trip');
    } else if (trip.buddies.includes(userId)) {
        throw new Error('Cannot join the same trip twice');
    }

    trip.buddies.push(userId);
    trip.seats--;

    await trip.save();
}

async function getUserTrips(user) {
    return await Trip.find({ creator: user }).lean();
}

module.exports = { getAll, getById, createTrip, editTrip, joinTrip, getUserTrips };