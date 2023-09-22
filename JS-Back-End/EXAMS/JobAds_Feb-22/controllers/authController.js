const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/userService');
const { errorParser } = require('../utils/parser');


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