const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');
const postController = require('../controllers/postController');
const { isGuest } = require('../middlewares/guards');

module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
};