const { isUser, isOwner } = require('../middlewares/guards');
const { errorParser } = require('../utils/parser');

const bookController = require('express').Router();
const bookService = require('../services/bookService');

bookController.get('/catalog', async (req, res) => {

    const books = await bookService.getAll();

    res.render('catalog', {
        title: 'Book Catalog',
        books
    });

});

bookController.get('/:id/details', async (req, res) => {

    const book = await bookService.getById(req.params.id);

    if (req.user) {
        book.isUser = true;
        book.isOwner = req.user?._id == book.ownerId;
        book.hasWished = book.wishingList.some(wishId => wishId == req.user?._id);
    }

    res.render('details', {
        title: `${book.title} details`,
        book
    });

});

bookController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

module.exports = bookController;