const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { errorParser } = require('../utils/parser');

const electronicsService = require('../services/electronicsService');

const electronicsController = require('express').Router();

electronicsController.get('/catalog', async (req, res) => {

    const electronics = await electronicsService.getAll();

    res.render('catalog', {
        title: 'Catalog',
        electronics
    });

});

electronicsController.get('/:id/details', async (req, res) => {

    const electronics = await electronicsService.getById(req.params.id);

    if (req.user) {
        electronics.isUser = true;

        //The owner
        electronics.isOwner = req.user._id == electronics.owner;

        //User that has bought
        electronics.hasBought = electronics.buyingList.some(boughtId => boughtId == req.user._id);
    }

    res.render('details', {
        title: `${electronics.name} details`,
        electronics
    });

});

electronicsController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

electronicsController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await electronicsService.create(req.body, req.user._id);
        res.redirect('/electronics/catalog'); //As assignemnt says
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});
module.exports = electronicsController;