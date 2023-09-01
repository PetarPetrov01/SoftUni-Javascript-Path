const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const notFoundController = require('../controllers/notFoundController');
const tripController = require('../controllers/tripController');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/trip', tripController);
    app.use('/auth', authController);
    app.use(notFoundController);
};