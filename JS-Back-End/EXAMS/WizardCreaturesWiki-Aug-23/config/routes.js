const authController = require('../controllers/authController');
const creatureController = require('../controllers/creatureController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');

module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/creature', creatureController);
    app.use('*', missingController);
};