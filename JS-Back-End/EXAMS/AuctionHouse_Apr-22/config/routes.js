const auctionController = require('../controllers/auctionController');
const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/auction', auctionController);
    app.use('*', missingController);
};