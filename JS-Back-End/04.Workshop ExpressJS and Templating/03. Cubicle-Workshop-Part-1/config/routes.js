// TODO: Require Controllers...
const homeController = require('../controllers/homeController')
const missingController = require('../controllers/missingController')

module.exports = (app) => {
    // TODO...
    app.use(homeController)

    app.use('/create', createController)

    app.use(missingController)
};