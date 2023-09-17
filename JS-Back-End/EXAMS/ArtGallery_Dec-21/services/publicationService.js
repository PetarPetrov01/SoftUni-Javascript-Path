const { Publication } = require('../models/publication');

async function getAll() {
    return await Publication.find({}).lean();
}

async function getById(id) {
    return await Publication.findById(id).lean().populate('author');
}
async function createPublication(data, ownerId) {
    const publication = {
        title: data.title,
        technique: data.technique,
        artPicture: data.artPicture,
        authenticity: data.authenticity,
        author: ownerId,
        usersShared: data.usersShared,
    };

    await Publication.create(publication);
}
async function editPublication(id, data, userId) {
}
async function sharePublication(publicationId, userId) {
}
async function getOwnPublications(userId) {
}
async function getSharedPosts(userId) {
}
module.exports = { getAll, createPublication, getById, editPublication, sharePublication, getOwnPublications, getSharedPosts };