const { isUser } = require('../middlewares/guards');
const { Publication } = require('../models/publication');
const { createPublication, getAll, getById, editPublication, sharePublication } = require('../services/publicationService');
const { errorParser } = require('../utils/parser');

const publicationController = require('express').Router();

publicationController.get('/catalog', async (req, res) => {
    const publications = await getAll();

    res.render('catalog', {
        title: 'Gallery',
        publications
    });

});

publicationController.get('/:id/details', async (req, res) => {
    const publication = await getById(req.params.id);

    if (req.user) {
        publication.user = true;
        publication.isOwner = req.user._id == publication.author._id;

        if (publication.usersShared
            .map(p => p.toString())
            .includes(req.user._id)
        ) {
            publication.hasShared = true;
        }
    }

    publication.author = publication.author.username;

    console.log(publication);

    res.render('details', {
        title: publication.title + ' details',
        publication
    });
});

publicationController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create page'
    });
});

publicationController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled');
        }

        await createPublication(req.body, req.user._id);
        res.redirect('/');

    } catch (error) {
        res.render('create', {
            title: 'Create page',
            error: errorParser(error),
            body: req.body
        });
    }
});
