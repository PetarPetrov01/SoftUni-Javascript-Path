const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');
const publicationController = require('../controllers/publicationController');

module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/publication', publicationController);
    app.use(missingController);
};