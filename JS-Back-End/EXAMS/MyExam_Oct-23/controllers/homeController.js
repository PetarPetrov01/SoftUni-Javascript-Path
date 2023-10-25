const { isUser } = require('../middlewares/guards');
const electronicsService = require('../services/electronicsService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home', {
        title: 'Home'
    });
});

homeController.get('/search', isUser(), async (req, res) => {
    const electronics = await electronicsService.getAll();

    //According to assignemnt, when opened all records should be visualized
    res.render('search', {
        title: 'Search',
        electronics,
        
    });
});

homeController.post('/search', isUser(), async (req, res) => {
    const electronics = await electronicsService.search(req.body.name, req.body.type);

    res.render('search', {
        title: 'Search',
        electronics,
        body: req.body
    });
});

module.exports = homeController;