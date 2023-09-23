const { isUser } = require('../middlewares/guards');
const { Ad } = require('../models/ads');
const { createAd, getAll, getById, editAd, apply } = require('../services/adService');
const { errorParser } = require('../utils/parser');

const adsController = require('express').Router();

adsController.get('/catalog', async (req, res) => {
    const ads = await getAll();

    res.render('catalog', {
        title: 'All ads',
        ads
    });

});
