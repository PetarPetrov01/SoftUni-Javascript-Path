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

publicationController.get('/:id/edit', isUser(), async (req, res) => {

    const publication = await getById(req.params.id);

    if (req.user._id != publication.author._id) {
        res.redirect('/publication/catalog');
    }

    res.render('edit', {
        title: 'Edit',
        body: publication
    });

});

publicationController.post('/:id/edit', isUser(), async (req, res) => {

    try {
        await editPublication(req.params.id, req.body, req.user._id);
        res.redirect(`/publication/${req.params.id}/details`);
    } catch (error) {
        let body = req.body;
        body._id = req.params.id;

        res.render('edit', {
            title: 'Edit',
            error: errorParser(error),
            body: req.body
        });
    }
});

publicationController.get('/:id/delete', isUser(), async (req, res) => {
    await Publication.findByIdAndDelete(req.params.id);
    res.redirect('/publication/catalog');
});

publicationController.get('/:id/share', isUser(), async (req, res) => {
    try {
        await sharePublication(req.params.id, req.user._id);
        res.redirect(`/publication/${req.params.id}/details`);
    } catch (error) {
        res.redirect('/publication/catalog');
    }
});

publicationController.get('*', (req, res) => {
    res.render('404');
});


module.exports = publicationController;