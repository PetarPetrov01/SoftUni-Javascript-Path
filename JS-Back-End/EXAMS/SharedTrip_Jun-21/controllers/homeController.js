const { isUser } = require('../middlewares/guards');
const { getUserTrips } = require('../services/tripService');
const { getUser } = require('../services/userService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/profile', isUser(), async (req, res) => {
    const userTrips = await getUserTrips(req.user._id);
    const user = await getUser(req.user._id);

    user.isMale = user.gender == 'male';
    user.tripsHistory = userTrips.length;

    res.render('profile', {
        title: `${user.email} profile`,
        user,
        userTrips
    });
});

module.exports = homeController;