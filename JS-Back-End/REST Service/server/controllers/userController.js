const { login, register, logout } = require('../services/userService');
const { body, validationResult } = require('express-validator');
const { errorParser } = require('../util/parseError');

const userController = require('express').Router();

userController.post('/register',
    body('email').isEmail().withMessage('Incorrect email'),
    body('password').isLength({ min: 3 }).withMessage('Password must be atleast 3 characters long'),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (errors.length > 0) {
                throw errors;
            }

            const user = await register(req.body.email, req.body.password);
            res.json(user);
        } catch (error) {
            const message = errorParser(error);
            res.status(400).json(message);
        }
    });

userController.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password);
        res.json(user);
    } catch (error) {
        const message = errorParser(error);
        res.status(400).json(message);
    }
});


userController.get('/logout', async (req, res) => {
    const token = req.body['X-Authorization'];
    await logout(token);
    res.sendStatus(204).end();
});

module.exports = userController;

