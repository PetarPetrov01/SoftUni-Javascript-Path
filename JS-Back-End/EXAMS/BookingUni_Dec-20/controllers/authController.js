const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register');
});

authController.get('/login', (req, res) => {
    res.render('login');
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.email == '' || req.body.username == '' || req.body.password == '') {
            throw new Error('All inputs must be filled!');
        }
        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }
        if (req.body.password.length < 5) {
            throw new Error('Password must be atleast 5 characters long!');
        }

        const token = await register(req.body.email, req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
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

authController.post('/login', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All inputs must be filled!');
        }

        const token = await login(req.body.email, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            error: errorParser(error),
            body: {
                username: req.body.username
            }
        });
    }
});

authController.get('/logout', (req, res) => {
    // TODO Check redirection
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = authController;