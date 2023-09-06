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
    const offer = await Offer.findById(offerId);


    if (offer.owner != userId) {
        throw new Error('This offer is not yours');
    }
    offer.name = data.name;
    offer.type = data.type;
    offer.year = data.year;
    offer.city = data.city;
    offer.homeImage = data.homeImage;
    offer.description = data.description;
    offer.available = data.available;

    await offer.save();
}

async function rentHome(offerId, userId) {
    const offer = await Offer.findById(offerId);

    if (offer.owner == userId) {
        throw new Error('You can\'t rent your own home!');
    } else if (offer.tenants.includes(userId)) {
        throw new Error('You already rented this home!');
    }

    offer.tenants.push(userId);
    offer.available--;

    await offer.save();
}

async function searchHome(searchType) {
    return await Offer.find({ type: new RegExp(searchType, 'i') }).lean();
}

module.exports = { createOffer, getAll, getLastThree, getOffer, editOffer, rentHome, searchHome };