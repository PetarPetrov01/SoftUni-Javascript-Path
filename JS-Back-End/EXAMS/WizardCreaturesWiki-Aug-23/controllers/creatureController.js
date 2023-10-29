const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
const { errorParser } = require('../utils/parser');

const creatureController = require('express').Router();
const creatureService = require('../services/creatureService');

creatureController.get('/catalog', async (req, res) => {

    const creatures = await creatureService.getAll();

    res.render('catalog', {
        title: 'Catalog',
        creatures
    });

});

creatureController.get('/:id/details', async (req, res) => {

    const creature = await creatureService.getByIdPopulated(req.params.id);
    creature.author = `${creature.ownerId.firstName} ${creature.ownerId.lastName}`;

    if (req.user) {
        creature.isUser = true;
        creature.isOwner = req.user?._id == creature.ownerId._id;
    }
    creature.voteCount = creature.votes.length;

    if (creature.voteCount > 0) {
        creature.voteEmails = creature.votes.map(user => user.email).join(', ');
    }

    res.render('details', {
        title: `${creature.name} details`,
        creature
    });

});

creatureController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

creatureController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await creatureService.create(req.body, req.user._id);
        res.redirect('/creature/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});

creatureController.get('/:id/edit', preload(), isOwner(), async (req, res) => {

    const creature = await creatureService.getById(req.params.id);

    res.render('edit', {
        title: 'Edit',
        body: creature
    });

});

creatureController.post('/:id/edit', preload(), isOwner(), async (req, res) => {

    try {
        await creatureService.edit(req.params.id, req.body);
        res.redirect(`/creature/${req.params.id}/details`);
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


module.exports = creatureController;