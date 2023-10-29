const { getById } = require('../services/creatureService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;

        //TODO Change according to assignemnt
        res.locals.creature = await getById(id);

        next();
    };
}

module.exports = preload;