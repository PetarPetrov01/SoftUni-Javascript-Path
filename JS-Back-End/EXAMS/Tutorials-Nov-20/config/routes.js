const authController = require('../controllers/authController');
const courseController = require('../controllers/courseController');
const homeController = require('../controllers/homeController');
const { isUser } = require('../middlewares/guards');


module.exports = (app) => {
    console.log('Routes loading');
    app.use(homeController);
    app.use('/auth', authController);
    app.use('/course', isUser(), courseController);
};