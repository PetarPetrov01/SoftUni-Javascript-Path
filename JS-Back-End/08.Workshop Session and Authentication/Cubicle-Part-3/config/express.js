const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');
const userNav = require('../middlewares/userNavigation');

const jwtSecret = '993afe99fe412';

module.exports = (app) => {
    const hbs = handlebars.create(
        { extname: '.hbs' }
    );
    // Setup the view engine
    app.engine('.hbs', hbs.engine);
    app.set('view engine', '.hbs');

    // Setup the body parser
    app.use(express.urlencoded({ extended: true }));

    // Setup the static files
    app.use('/static', express.static('static'));

    app.use(cookieParser());
    app.use(auth(jwtSecret));
    app.use(userNav);
};