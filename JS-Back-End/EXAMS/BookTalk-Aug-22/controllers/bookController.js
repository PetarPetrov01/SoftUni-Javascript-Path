const { isUser, isOwner } = require('../middlewares/guards');
const preload = require('../middlewares/preload');
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

bookController.post('/create', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await bookService.create(req.body, req.user._id);
        res.redirect('/books/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create',
            error: errorParser(error),
            body: req.body
        });
    }
});

bookController.get('/:id/edit', preload(), isOwner(), async (req, res) => {

    const book = await bookService.getById(req.params.id);

    res.render('edit', {
        title: 'Edit',
        body: book
    });

});

bookController.post('/:id/edit', preload(), isOwner(), async (req, res) => {

    try {
        await bookService.edit(req.params.id, req.body);
        res.redirect(`/books/${req.params.id}/details`);
    } catch (error) {
        const body = req.body;
        body._id = req.params.id;

        console.log(error);

        res.render('edit', {
            title: 'Edit',
            error: errorParser(error),
            body
        });
    }
});

bookController.get('/:id/delete', preload(), isOwner(), async (req, res) => {
    try {
        await bookService.deleteById(req.params.id);
        res.redirect('/books/catalog');
    } catch (error) {
        res.render('home', {
            title: 'Home',
            error: errorParser(error)
        });
    }
});

module.exports = bookController;