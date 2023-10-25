const authController = require('../controllers/authController');
const electronicsController = require('../controllers/electronicsController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');

module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/electronics', electronicsController);
    app.use('*', missingController);
};