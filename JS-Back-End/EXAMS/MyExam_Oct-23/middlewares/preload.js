const { getById } = require('../services/electronicsService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;

        res.locals.el = await getById(id);

        next();
    };
}

module.exports = preload;