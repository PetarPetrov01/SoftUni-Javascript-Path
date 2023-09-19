const { getAllClosed } = require('../services/auctionService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});


