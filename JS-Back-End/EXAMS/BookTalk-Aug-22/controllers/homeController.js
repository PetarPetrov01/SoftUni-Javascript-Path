const { isUser } = require('../middlewares/guards');
const { getWishedBooks } = require('../services/bookService');

const homeController = require('express').Router();

homeController.get('/', (req, res) => {
    res.render('home');
});

module.exports = homeController;