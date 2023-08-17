// TODO: Require Controllers...
const homeController = require('../controllers/homeController')
const missingController = require('../controllers/missingController')
const createController = require('../controllers/createController')

module.exports = (app) => {
    // TODO...
    app.use(homeController)

    app.use('/create', createController)

    app.use(missingController)
};