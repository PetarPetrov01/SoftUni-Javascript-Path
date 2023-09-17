const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');
module.exports = (app) => {
    console.log('Routes loading');
    app.use('/auth', authController);
    app.use(missingController);
};