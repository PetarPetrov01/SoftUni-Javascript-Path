const { Auction } = require('../models/Auction');

async function getAll() {
    return await Auction.find({ closed: false }).lean();
}

async function getAllClosed() {
    return await Auction.find({ closed: true }).populate('bidder').lean();
}

async function getById(id) {
    return await Auction.findById(id).populate('author bidder').lean();
}

async function createAuction(data, userId) {

    const categories = {
        vehicles: 'Vehicles',
        estate: 'Real Estate',
        electronics: 'Electronics',
        furniture: 'Furniture',
        other: 'Other'
    };

    const auction = {
        title: data.title,
        description: data.description,
        category: categories[data.category],
        imageUrl: data.imageUrl,
        price: Number(data.price),
        author: userId
    };

    await Auction.create(auction);

}

async function editAuction(id, data) {

    const auction = await Auction.findById(id);

    const categories = {
        vehicles: 'Vehicles',
        estate: 'Real Estate',
        electronics: 'Electronics',
        furniture: 'Furniture',
        other: 'Other'
    };

    auction.title = data.title;
    auction.description = data.description;
    auction.category = categories[data.category];
    auction.imageUrl = data.imageUrl;
    auction.price = Number(data.price);

    await auction.save();
}

async function deleteAuction(id) {
    await Auction.findByIdAndDelete(id);
}

async function bidAuction(id, userId, bidPrice) {
    const auction = await Auction.findById(id);

    if (auction.bidder == userId) {
        throw new Error('You are currently the highest bidder');
    }
    if (auction.author == userId) {
        throw new Error('You can\'t bid for your own listing');
    }
    if (auction.price >= bidPrice) {
        throw new Error('Your bid must be higher than the current price');
    }

    auction.bidder = userId;
    auction.price = bidPrice;

    await auction.save();

    return auction.populate('author');
}

async function closeAuction(id) {
    const auction = await Auction.findById(id);
    auction.closed = true;
    await auction.save();
}

module.exports = { getAll, getById, createAuction, editAuction, deleteAuction, bidAuction, getAllClosed, closeAuction };