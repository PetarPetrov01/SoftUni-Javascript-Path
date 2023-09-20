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

auctionController.get('/:id/details', async (req, res) => {

    const auction = await getById(req.params.id);

    let isUser;
    let isOwner;
    auction.authorName = `${auction.author.firstName} ${auction.author.lastName}`;
    auction.bidderName = auction.bidder ? `${auction.bidder.firstName} ${auction.bidder.lastName}` : false;

    if (req.user) {
        isUser = true;
        auction.hasBid = auction.bidder && auction.bidder._id == req.user._id;

        if (req.user._id == auction.author._id) {
            isOwner = true;
        }
    }

    if (isOwner) {
        res.render('details-owner', {
            title: `${auction.title} details`,
            auction
        });
    } else {
        res.render('details', {
            title: `${auction.title} details`,
            auction,
            isUser
        });
    }

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

auctionController.get('/:id/edit', isUser(), async (req, res) => {

    const auction = await getById(req.params.id);
    const hasBid = auction.bidder;
    try {

        if (auction.author._id != req.user._id) {
            throw new Error('You can\'t edit this post');
        }

        res.render('edit', {
            title: 'Edit',
            body: auction,
            hasBid
        });
    } catch (error) {
        console.log(errorParser(error));
        res.redirect(`/auction/${req.params.id}/details`);
    }

});

auctionController.post('/:id/edit', isUser(), async (req, res) => {
    try {
        await editAuction(req.params.id, req.body);
        res.redirect(`/auction/${req.params.id}/details`);
    } catch (error) {
        const body = req.body;
        body._id = req.params.id;

        res.render('edit', {
            title: 'Edit',
            error: errorParser(error),
            body
        });
    }
});

auctionController.get('/:id/delete', isUser(), async (req, res) => {
    try {
        await deleteAuction(req.params.id);
        res.redirect('/auction/catalog');
    } catch (error) {
        res.render('home', {
            title: 'Home page',
            error: errorParser(error)
        });
    }
});

auctionController.post('/:id/bid', isUser(), async (req, res) => {

    try {
        await bidAuction(req.params.id, req.user._id, req.body.amount);
        res.redirect(`/auction/${req.params.id}/details`);
    } catch (error) {
        res.render('home', {
            title: 'Home page',
            error: errorParser(error)
        });
    }
});

auctionController.get('/:id/close', isUser(), async (req, res) => {
    await closeAuction(req.params.id);
    res.redirect('/closed');
});

module.exports = auctionController;