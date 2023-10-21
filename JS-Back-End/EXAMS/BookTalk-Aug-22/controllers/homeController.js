const { isUser } = require('../middlewares/guards');
const { getWishedBooks } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

homeController.get('/profile', isUser(), async (req, res) => {

    const books = await getWishedBooks(req.user._id);
    console.log(books);
    
    res.render('profile', {
        title: `${req.user.username} profile`,
        books,
        email: req.user.email
    });
});

module.exports = homeController;