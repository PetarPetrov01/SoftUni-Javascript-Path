const { isUser, isOwner } = require('../middlewares/guards');
const bookController = require('express').Router();
const bookService = require('../services/bookService');

bookController.get('/catalog', async (req, res) => {

    const books = await bookService.getAll();

    res.render('catalog', {
        title: 'Book Catalog',
        books
    });

});

bookController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

module.exports = bookController;