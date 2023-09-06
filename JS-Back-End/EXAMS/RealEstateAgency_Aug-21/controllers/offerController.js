const { errorParser } = require('../utils/parser');
const { createOffer, getAll, getOffer, editOffer, rentHome, searchHome } = require('../services/offerService');
const { isUser } = require('../middlewares/guards');
const { Offer } = require('../models/offer');

const offerController = require('express').Router();

offerController.get('/forRent', async (req, res) => {
    const offers = await getAll();

    res.render('forRent', {
        title: 'For rent',
        offers
    });
});

offerController.get('/:id/details', async (req, res) => {
    const offer = await getOffer(req.params.id);

    if (req.user) {
        offer.isUser = true;
        offer.isOwner = offer.owner == req.user._id;
        offer.hasRented = offer.tenants
            .some(u => u._id == req.user._id);
    }

    if (offer.tenants.length > 0) {
        offer.tenants = offer.tenants
            .map(u => u.name)
            .join(', ');
    }

    offer.isAvailable = offer.available > 0;

    res.render('details', {
        title: `${offer.name} details`,
        offer
    });
});

offerController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create offer'
    });
});

offerController.post('/create', isUser(), async (req, res) => {
    try {
        await createOffer(req.body, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            title: 'Create offer',
            error: errorParser(error),
            body: req.body
        });
    }
});

offerController.get('/:id/edit', isUser(), async (req, res) => {
    const offer = await getOffer(req.params.id);

    if (offer.owner != req.user._id) {
        console.log('You are not the owner of this offer');
        return res.redirect('/');
    }

    res.render('edit', {
        title: 'Edit ',
        body: offer
    });
});

offerController.post('/:id/edit', isUser(), async (req, res) => {
    try {
        await editOffer(req.params.id, req.body, req.user._id);
        res.redirect(`/offer/${req.params.id}/details`);
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


offerController.get('/:id/delete', async (req, res) => {
    await Offer.findByIdAndDelete(req.params.id);
    res.redirect('/offer/forRent');
});

offerController.get('/:id/rent', isUser(), async (req, res) => {
    try {
        await rentHome(req.params.id, req.user._id);
        res.redirect(`/offer/${req.params.id}/details`);
    } catch (error) {
        res.redirect('/');
        console.log(error);
    }
});

offerController.get('/search', isUser(), async (req, res) => {
    res.render('search', {
        title: 'Search offers'
    });
});

offerController.post('/search', isUser(), async (req, res) => {
    const offers = await searchHome(req.body.search);

    res.render('search', {
        title: 'Search offers',
        offers
    });
});

module.exports = offerController;