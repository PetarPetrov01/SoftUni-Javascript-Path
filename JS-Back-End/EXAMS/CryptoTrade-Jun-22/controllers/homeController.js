const { isUser } = require('../middlewares/guards');
const cryptoService = require('../services/cryptoService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/search', isUser(), async (req, res) => {
    const cryptos = await cryptoService.getAll();

    res.render('search', {
        title: 'search',
        cryptos
    });
});

homeController.post('/search', isUser(), async (req, res) => {
    const cryptos = await cryptoService.search(req.body.search, req.body.paymentMethod);
    res.render('search', {
        title: 'search',
        cryptos
    });
});


module.exports = homeController;