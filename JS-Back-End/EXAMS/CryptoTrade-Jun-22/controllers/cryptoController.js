const { errorParser } = require('../utils/parser');
const cryptoService = require('../services/cryptoService');

const cryptoController = require('express').Router();

cryptoController.get('/catalog', async (req, res) => {
    const cryptos = await cryptoService.getAll();

    res.render('catalog', {
        title: 'All',
        cryptos
    });
});

cryptoController.get('/:id/details', async (req, res) => {

    const crypto = await cryptoService.getById(req.params.id);
    crypto.isOwner = req.user?._id == crypto.owner;

    if (req.user) {
        crypto.isUser = true;
        crypto.hasBought = crypto.bought.some((id) => id == req.user._id);
    }

    res.render('details', {
        title: `${crypto.name} details`,
        crypto
    });

});

cryptoController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await cryptoService.create(req.body, req.user._id);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});

