const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

authController.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

authController.post('/register', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All inputs must be filled!');
        }
        if (req.body.password.length < 3) {
            throw new Error('Password must be atleast 3 characters long!');
        }

        if (req.body.password != req.body.rePass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.username, req.body.password, req.body.address);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            title: 'Register',
            error: errorParser(error),
            body: {
                username: req.body.username,
                address: req.body.address
            }
        });
    }
});

authController.post('/login', async (req, res) => {
    try {
        if (req.body.username == '' || req.body.password == '') {
            throw new Error('All inputs must be filled!');
        }

        const token = await login(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            title: 'Login',
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