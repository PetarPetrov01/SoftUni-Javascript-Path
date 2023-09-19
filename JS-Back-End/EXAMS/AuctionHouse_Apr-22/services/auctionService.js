const { Auction } = require('../models/Auction');
async function getAll() {
    return await Auction.find({ closed: false }).lean();
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
}
async function deleteAuction(id) {
}
async function bidAuction(id, userId, bidPrice) {
}
async function closeAuction(id) {
}
module.exports = { getAll, getById, createAuction, editAuction, deleteAuction, bidAuction, getAllClosed, closeAuction };