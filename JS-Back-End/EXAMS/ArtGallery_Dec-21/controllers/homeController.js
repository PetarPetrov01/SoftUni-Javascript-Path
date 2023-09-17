const { isUser } = require('../middlewares/guards');
const { getAll, getOwnPublications, getSharedPosts } = require('../services/publicationService');
const { getUser } = require('../services/userService');

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

homeController.get('/profile', isUser(), async (req, res) => {
    const publications = (await getOwnPublications(req.user._id))
        .map(p => p.title)
        .join(', ');

    const shares = (await getSharedPosts(req.user._id))
        .map(p => p.title)
        .join(', ');

    const user = await getUser(req.user._id);

    console.log('==> publ - ' + publications);
    console.log('==> shares - ' + shares);
    res.render('profile', {
        publications,
        shares,
        user
    });
});

module.exports = homeController;