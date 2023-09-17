const authController = require('../controllers/authController');
module.exports = (app) => {
    console.log('Routes loading');
    app.use('/auth', authController);
    app.use(missingController);
};