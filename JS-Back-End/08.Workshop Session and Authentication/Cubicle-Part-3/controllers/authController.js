const { body, validationResult } = require('express-validator');
const { login, register } = require('../services/authService');
const { errorParser } = require('../util/parser');


const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

//Logging in
router.post('/login', async (req, res) => {
    try {
        const result = await login(req.body.username, req.body.password);
        attachToken(req, res, result);
        res.redirect('/');
    } catch (error) {
        res.render('login', {
            error: errorParser(error),
            body: { username: req.body.username }
        });
    }
});

//Signing up
router.post('/register',
    body('username')
        .trim()
        .isAlphanumeric().withMessage('Username may only consist of alphanumeric symbols!')
        .isLength({ min: 5 }).withMessage('Username must be atleast 5 characters long!'),
    body('password')
        .trim()
        .isAlphanumeric().withMessage('Password may only consist of alphanumeric symbols!')
        .isLength({ min: 8 }).withMessage('Password must be atleast 8 characters long!'),
    body('repeatPassword')
        .trim()
        .custom((value, { req }) => {
            return value == req.body.password;
        }).withMessage('Passwords do not match!'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            console.log(errors);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await register(req.body.username, req.body.password);
            attachToken(req, res, result);
            res.redirect('/');
        } catch (error) {
            res.render('register', {
                username: req.body.username,
                error: errorParser(error)
            });
        }
    });

router.get('/logout', (req, res) => {
    console.log('Logging out...');
    res.clearCookie('jwt');
    res.redirect('/');
});

function attachToken(req, res, data) {
    const token = req.signJwt(data);
    res.cookie('jwt', token, { maxAge: 14000000 });
}
module.exports = router;