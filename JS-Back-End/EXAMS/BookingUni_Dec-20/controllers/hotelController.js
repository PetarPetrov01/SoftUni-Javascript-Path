const { create, getById, update, deleteById, bookRoom } = require('../services/hotelService');
const { errorParser } = require('../utils/parser');

const hotelController = require('express').Router();


hotelController.get('/create', (req, res) => {
    res.render('create');
});

hotelController.post('/create', async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await create(req.body, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            error: errorParser(error),
            body: req.body
        });
    }
});

hotelController.get('/:id', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner == req.user._id) {
        hotel.isOwner = true;
    } else if (hotel.bookedRooms.map(r => r.toString()).includes(req.user._id.toString())) {
        hotel.isBooked = true;
    }

    res.render('details', {
        hotel
    });
});

hotelController.get('/edit/:id', async (req, res) => {
    const hotel = await getById(req.params.id);

    if (hotel.owner != req.user._id) {
        res.redirect('/');
    }

    res.render('edit', {
        hotel
    });
});

hotelController.post('/edit/:id', async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await update(req.params.id, req.body);
        res.redirect(`/hotel/${req.params.id}`);
    } catch (error) {
        res.render('edit', {
            error: errorParser(error),
            hotel: req.body
        });
    }
});

hotelController.get('/delete/:id', async (req, res) => {
    console.log('deleteing' + req.params.id);
    await deleteById(req.params.id);
    res.redirect('/');
});

hotelController.get('/book/:id', async (req, res) => {
    const hotel = await getById(req.params.id);

    try {
        if (hotel.owner == req.user_id) {
            hotel.isOwner = true;
            throw new Error('Can\'t book your own listing');
        }

        await bookRoom(req.params.id, req.user._id);
        res.redirect(`/hotel/details/${req.params.id}`);
    } catch (error) {
        res.render('details', {
            error: errorParser(error),
            hotel
        });
    }
});

module.exports = hotelController;