module.exports = (app) => {
    console.log('Routes loading');
    app.use('/auth', authController);
};