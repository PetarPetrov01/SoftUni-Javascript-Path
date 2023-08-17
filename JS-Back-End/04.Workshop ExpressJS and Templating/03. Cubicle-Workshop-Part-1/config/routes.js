// TODO: Require Controllers...
const homeController = require('../controllers/homeController')

module.exports = (app) => {
    // TODO...
    app.use(homeController)


    app.use(missingController)
};