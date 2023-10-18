const { isUser, isOwner } = require('../middlewares/guards');
const { errorParser } = require('../utils/parser');
const cryptoService = require('../services/cryptoService');
const preload = require('../middlewares/preload');

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

cryptoController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
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

cryptoController.get('/:id/edit', preload(), isOwner(), async (req, res) => {

    const crypto = await cryptoService.getById(req.params.id);

    res.render('edit', {
        title: 'Edit',
        body: crypto
    });

});

cryptoController.post('/:id/edit', preload(), isOwner(), async (req, res) => {

    try {
        await cryptoService.edit(req.params.id, req.body);
        res.redirect(`/crypto/${req.params.id}/details`);
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

cryptoController.get('/:id/delete', preload(), isOwner(), async (req, res) => {
    try {
        await cryptoService.deleteById(req.params.id);
        res.redirect('/crypto/catalog');
    } catch (error) {
        res.render('/');
    }
});

cryptoController.get('/:id/buy', isUser(), async (req, res) => {
    try {
        await cryptoService.buy(req.params.id, req.user?._id);
        res.redirect(`/crypto/${req.params.id}/details`);
    } catch (error) {
        res.redirect('/');
    }
});

module.exports = cryptoController;