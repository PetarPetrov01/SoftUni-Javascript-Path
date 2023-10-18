const cryptoService = require('../services/cryptoService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;

        //TODO Change according to assignemnt
        res.locals.crypto = await cryptoService.getById(id);

        next();
    };
}

module.exports = preload;