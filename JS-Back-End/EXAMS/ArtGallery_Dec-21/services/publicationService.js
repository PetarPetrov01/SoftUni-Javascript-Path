const { Publication } = require('../models/publication');
async function getAll() {
    return await Publication.find({}).lean();
}
async function getById(id) {
}
async function createPublication(data, ownerId) {
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