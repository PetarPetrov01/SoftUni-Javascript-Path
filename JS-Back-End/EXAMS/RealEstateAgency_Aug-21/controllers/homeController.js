const { getLastThree } = require('../services/offerService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const offers = await getLastThree();

    res.render('home', {
        title: 'Home page',
        offers
    });
});

module.exports = homeController;