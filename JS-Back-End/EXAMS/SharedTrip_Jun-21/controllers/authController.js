const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        console.log(req.body);

        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs are required');
        } else if (req.body.password.length < 4) {
            throw new Error('Password must be atleast 4 characters long');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.email, req.body.password, req.body.gender);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: req.body
        });
    }
});

authController.post('/login', isGuest(), async (req, res) => {
    try {
        if (req.body.email == '' || req.body.password == '') {
            throw new Error('All inputs must be filled!');
        }

        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            error: errorParser(error),
            body: req.body
        });
    }
});

authController.get('/logout', (req, res) => {
    // TODO Check redirection
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;