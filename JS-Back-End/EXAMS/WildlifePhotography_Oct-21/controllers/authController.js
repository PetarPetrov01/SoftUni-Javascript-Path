const { isGuest, isUser } = require('../middlewares/guards');
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
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        if (req.body.password.length < 4) {
            throw new Error('Password must be atleast 4 characters long!');
        }

        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            }
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
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/logout', isUser(), (req, res) => {
    // TODO Check redirection
    console.log('Logging out');
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;