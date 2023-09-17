const { getAll, getOwnPublications, getSharedPosts } = require('../services/publicationService');
const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const publications = await getAll();

    publications.map(p => {
        p.shares = p.usersShared.length;
        return p;
    });

    res.render('home', {
        title: 'Home page',
        publications
    });
});
module.exports = homeController;