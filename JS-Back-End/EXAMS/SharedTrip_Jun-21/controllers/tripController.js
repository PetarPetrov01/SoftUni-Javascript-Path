const { isUser } = require('../middlewares/guards');
const { errorParser } = require('../utils/parser');
const { createTrip, getAll, getById, editTrip, joinTrip } = require('../services/tripService');
const { Trip } = require('../models/trip');

const tripController = require('express').Router();

tripController.get('/catalog', async (req, res) => {

    const trips = await getAll();

    res.render('catalog', {
        title: 'All',
        trips
    });

});

tripController.get('/:id/details', async (req, res) => {

    const trip = await getById(req.params.id);

    if (req.user) {
        trip.isUser = true;
        trip.isOwner = trip.creator._id == req.user._id;
        trip.hasJoined = trip.buddies.some(u => u._id == req.user._id);
    }

    if (trip.buddies.length > 0) {
        trip.buddies = trip.buddies
            .map(u => u.email)
            .join(', ');
    }

    trip.driver = trip.creator.email;
    console.log(trip);

    res.render('details', {
        title: 'Trip details',
        trip
    });

});

tripController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'create'
    });
});

tripController.post('/create', isUser(), async (req, res) => {
    try {
        if (isNaN(req.body.price) && isNaN(req.body.seats)) {
            throw new Error('Available seats and price must be a number!');
        }
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await createTrip(req.body, req.user._id);
        res.redirect('/trip/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});

tripController.get('/:id/edit', isUser(), async (req, res) => {

    const trip = await getById(req.params.id);

    if (req.user._id != trip.creator._id) {
        res.redirect(`/trip/${req.params.id}/details`);
        return console.log('Not the creator of this trip!');
    }

    res.render('edit', {
        title: 'Edit',
        body: trip
    });

});

tripController.post('/:id/edit', isUser(), async (req, res) => {

    try {
        if (isNaN(req.body.price) && isNaN(req.body.seats)) {
            throw new Error('Available seats and price must be a number!');
        }

        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await editTrip(req.params.id, req.body, req.user._id);
        res.redirect(`/trip/${req.params.id}/details`);
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

tripController.get('/:id/delete', isUser(), async (req, res) => {
    const trip = await getById(req.params.id);

    if (trip.creator._id != req.user._id) {
        res.redirect(`/trip/${req.params.id}/details`);
        return console.log('You can\'t delete this trip');
    }

    await Trip.findByIdAndDelete(req.params.id);
    res.redirect('/trip/catalog');
});

tripController.get('/:id/join', isUser(), async (req, res) => {

    try {
        await joinTrip(req.params.id, req.user._id);
        res.redirect(`/trip/${req.params.id}/details`);
    } catch (error) {
        res.render('home', {
            title: 'Home page',
            error: errorParser(error)
        });
    }
});

module.exports = tripController;