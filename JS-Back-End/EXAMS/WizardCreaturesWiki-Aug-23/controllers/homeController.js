const homeController = require('express').Router();

const { isUser } = require('../middlewares/guards');
const creatureService = require('../services/creatureService');

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/profile', isUser(), async (req, res) => {
    const creatures = await creatureService.getOwn(req.user._id);

    creatures.map(creature => {
        creature.author = `${creature.ownerId.firstName} ${creature.ownerId.lastName}`;
        creature.voteCount = creature.votes.length;
        return creature;
    });

    console.log(creatures);

    res.render('profile', {
        title: `${req.user.email} profile`,
        creatures

    });
});

module.exports = homeController;