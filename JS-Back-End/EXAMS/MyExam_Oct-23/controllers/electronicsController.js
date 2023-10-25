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