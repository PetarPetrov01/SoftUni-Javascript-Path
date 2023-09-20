const { getAllClosed } = require('../services/auctionService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/closed', async (req, res) => {
    const auctions = await getAllClosed();

    if (auctions) {
        auctions.map(a => {
            a.bidderName = `${a.bidder.firstName} ${a.bidder.lastName}`;
            return a;
        });
    }

    res.render('closed', {
        auctions
    });
});

module.exports = homeController;