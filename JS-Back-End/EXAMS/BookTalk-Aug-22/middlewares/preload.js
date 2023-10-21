const { getById } = require('../services/bookService');
const bookService = require('../services/bookService');

function preload() {
    return async function (req, res, next) {
        const id = req.params.id;

        //TODO Change according to assignemnt
        res.locals.book = await bookService.getById(id);

        next();
    };
}

module.exports = preload;