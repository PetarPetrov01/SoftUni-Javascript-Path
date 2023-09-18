const { register, login } = require('../services/userService');
const authController = require('express').Router();
authController.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

authController.post('/register', isGuest(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        if (req.body.password.length < 5) {
            throw new Error('Password must be atleast 5 characters long');
        }

        if (req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
        }

        const token = await register(req.body.email, req.body.password, req.body.firstName, req.body.lastName);
        res.cookie('token', token);
        res.redirect('/'); //Redirect depending on assignement 
    } catch (error) {
        res.render('register', {
            error: errorParser(error),
            body: {
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            }
        });
    }
});

