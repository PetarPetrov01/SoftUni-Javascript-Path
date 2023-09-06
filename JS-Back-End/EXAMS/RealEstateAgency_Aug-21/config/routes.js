const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const offerController = require('../controllers/offerController');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
};

