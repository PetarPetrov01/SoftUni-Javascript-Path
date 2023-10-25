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
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        if (req.body.password.length < 4) {
            throw new Error('Password must be atleast 4 characters long');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect to home page (assignemnt)
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: {
                email: req.body.email,
                username: req.body.username
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
        res.redirect('/'); //Redirect to home page (assignemnt)
    } catch (error) {
        res.render('login', {
            error: errorParser(error),
            body: {
                email: req.body.email
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/'); //Redirect to home page (assignemnt)
});

module.exports = authController;