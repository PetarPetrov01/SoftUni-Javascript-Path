const { isUser } = require('../middlewares/guards');
const { createAuction, getAll, getById, editAuction, deleteAuction, bidAuction, closeAuction } = require('../services/auctionService');
const { errorParser } = require('../utils/parser');
const auctionController = require('express').Router();

auctionController.get('/catalog', async (req, res) => {
    const auctions = await getAll();

    res.render('catalog', {
        title: 'Browse auctions',
        auctions
    });

});

auctionController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create'
    });
});

auctionController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await createAuction(req.body, req.user._id);
        //REDIRECT
        console.log('Created succefully');
        res.redirect('/auction/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});
module.exports = auctionController;