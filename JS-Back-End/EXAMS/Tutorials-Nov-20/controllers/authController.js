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
        if (req.body.password.length < 5) {
            throw new Error('Password must be atleast 5 characters long (Only english letters and numbers are allowed)');
        }
        
        if (req.body.password.match(/^[a-zA-Z0-9]$/) == false) {
            throw new Error('Only english letters and numbers are allowed');
        }

        if (req.body.password != req.body.rePassword) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.username, req.body.password);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: {
                username: req.body.username
            }
        });
    }
});
