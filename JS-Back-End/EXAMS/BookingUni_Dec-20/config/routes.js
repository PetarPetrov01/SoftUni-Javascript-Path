const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const hotelController = require('../controllers/hotelController');
const profileController = require('../controllers/profileController');
const { isUser } = require('../middlewares/guards');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/hotel', isUser(), hotelController);
    app.use('/profile', profileController);
};