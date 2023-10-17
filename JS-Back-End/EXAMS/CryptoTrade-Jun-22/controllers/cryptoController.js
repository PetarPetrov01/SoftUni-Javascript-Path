const { errorParser } = require('../utils/parser');
const cryptoService = require('../services/cryptoService');
const cryptoController = require('express').Router();
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

