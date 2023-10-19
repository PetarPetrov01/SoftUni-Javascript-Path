const { verifyToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            // TODO Check user model
            res.locals.username = userData.username;
        } catch (error) {
            console.log('Invalid token');

            res.clearCookie('token');
            res.redirect('/login');
            return;
        }
    }

    next();
};