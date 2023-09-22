const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/parser');

const authController = require('express').Router();

authController.get('/register', isGuest(), (req, res) => {
    res.render('register'), {
        title: 'Register'
    };
});

authController.get('/login', isGuest(), (req, res) => {
    res.render('login', {
        title: 'Login'
    });
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        if (req.body.password.length < 5) {
            throw new Error('The password should be at least 5 characters long');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.email, req.body.password, req.body.description);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            title: 'Register',
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
            title: 'Register',
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