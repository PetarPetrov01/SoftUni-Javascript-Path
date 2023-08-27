// TODO: Require Controllers...
const homeController = require('../controllers/homeController');
const missingController = require('../controllers/missingController');
const createController = require('../controllers/createController');
const detailsController = require('../controllers/detailsController');
const accessoryController = require('../controllers/accessoryController');
const authController = require('../controllers/authController');
const cubeController = require('../controllers/cubeController');
const { isUser } = require('../middlewares/guards');

module.exports = (app) => {
    // TODO...
    app.use(homeController);

    app.use('/create', isUser, createController);
    app.use('/details', detailsController);
    app.use('/accessory', accessoryController);
    app.use('/auth', authController);
    app.use('/cube', isUser, cubeController);

    app.use(missingController);
};