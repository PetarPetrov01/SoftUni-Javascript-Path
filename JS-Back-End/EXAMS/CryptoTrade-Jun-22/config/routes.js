const authController = require('../controllers/authController');
const cryptoController = require('../controllers/cryptoController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/crypto', cryptoController);
    app.use('*', missingController);
};