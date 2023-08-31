const { isUser } = require('../middlewares/guards');
const { getUserBookings } = require('../services/hotelService');

const profileController = require('express').Router();

profileController.get('/', isUser(), async (req, res) => {
    const bookedHotels = (await getUserBookings(req.user._id))
        .map(h => h.name)
        .join(', ');
    console.log(bookedHotels);
    res.render('profile', {
        user: req.user,
        bookedHotels
    });
});

module.exports = profileController;