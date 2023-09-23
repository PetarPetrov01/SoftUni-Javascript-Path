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

adsController.get('/:id/details', async (req, res) => {

    const ad = await getById(req.params.id);
    if (req.user) {
        ad.isUser = true;
        ad.isOwner = ad.author._id == req.user._id;
        ad.hasApplied = ad.applied.some(u => u._id == req.user._id);
    }

    ad.appliedCount = ad.applied.length;
    
    res.render('details', {
        title: 'Ad details',
        ad
    });
});

adsController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

adsController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await createAd(req.body, req.user._id);
        res.redirect('/ads/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create ad',
            error: errorParser(error),
            body: req.body
        });
    }
});

adsController.get('/:id/edit', isUser(), async (req, res) => {

    const ad = await getById(req.params.id);

    if(ad.author._id != req.user._id){
        res.redirect('/');
        console.log('Cannot edit this ad');
        return;
    }

    res.render('edit', {
        title: 'Edit',
        body: ad
    });

});

adsController.post('/:id/edit', isUser(), async (req, res) => {

    try {
        await editAd(req.params.id, req.body);
        res.redirect(`/ads/${req.params.id}/details`);
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

adsController.get('/:id/delete', async (req, res) => {
    await Ad.findByIdAndDelete(req.params.id);
    res.redirect('/ads/catalog');
});
