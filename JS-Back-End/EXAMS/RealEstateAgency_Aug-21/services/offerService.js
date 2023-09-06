const { Offer } = require('../models/offer');

async function getAll() {
    return await Offer.find({}).lean();
}

async function getLastThree() {
    return await Offer.find({})
        .lean()
        .sort({ createdAt: -1 })
        .limit(3);
}

async function getOffer(id) {
    return await Offer.findById(id).lean().populate('tenants');
}

async function createOffer(data, ownerId) {
    const offer = {
        name: data.name,
        type: data.type,
        year: Number(data.year),
        city: data.city,
        homeImage: data.homeImage,
        description: data.description,
        available: Number(data.available),
        owner: ownerId,
        createdAt: Number(new Date())
    };

    await Offer.create(offer);
}

async function editOffer(offerId, data, userId) {
}

async function rentHome(offerId, userId) {
}

async function searchHome(searchType) {
}

module.exports = { createOffer, getAll, getLastThree, getOffer, editOffer, rentHome, searchHome };