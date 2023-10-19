const { Book } = require('../models/Book');

async function getAll() {
    return await Book.find({}).lean();
}

async function getById(id) {
    return await Book.findById(id).lean();
}

async function create(data, ownerId) {

    const book = {
        title: data.title,
        author: data.author,
        genre: data.genre,
        stars: Number(data.stars),
        imageUrl: data.imageUrl,
        review: data.review,
        ownerId
    };

    await Book.create(book);
}

async function edit(id, data) {

}
async function deleteById(id) {
}
async function wish(bookId, userId) {


}
async function getWishedBooks(userId) {
}

module.exports = { getAll, getById, create, edit, deleteById, wish, getWishedBooks };