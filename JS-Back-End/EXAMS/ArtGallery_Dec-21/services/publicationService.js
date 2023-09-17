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
    const publication = await Publication.findById(id);

    if (publication.author != userId) {
        throw new Error('You are not the owner of this publication!');
    }

    publication.title = data.title;
    publication.technique = data.technique;
    publication.artPicture = data.artPicture;
    publication.authenticity = data.authenticity;

    await publication.save();

}

async function sharePublication(publicationId, userId) {
    const publication = await Publication.findById(publicationId);

    if (publication.author.toString() == userId) {
        throw new Error('You can\'t share your own publication');
    }

    publication.usersShared.push(userId);

    await publication.save();
}

async function getOwnPublications(userId) {
    return await Publication.find({ author: userId });
}

async function getSharedPosts(userId) {
    return await Publication.find({ usersShared: userId });
}

module.exports = { getAll, createPublication, getById, editPublication, sharePublication, getOwnPublications, getSharedPosts };