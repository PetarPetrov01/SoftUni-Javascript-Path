const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
};