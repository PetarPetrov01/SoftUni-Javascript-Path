const { getFirstThree, searchAds } = require('../services/adService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    const ads = await getFirstThree();

    ads.map(a => {
        a.candidates = a.applied.length;
        return a;
    });

    res.render('home', {
        title: 'Home page',
        ads
    });
});

homeController.get('/search', (req, res) => {
    res.render('search', {
        title: 'Search ads',
    });
});

homeController.post('/search', async (req, res) => {
    try {
        const ads = await searchAds(req.body.email);

        res.render('search', {
            title: 'Search',
            ads
        });
    } catch (error) {
        res.render('search', {
            title: 'Search',
            body: req.body
        });
    }
});

module.exports = homeController;