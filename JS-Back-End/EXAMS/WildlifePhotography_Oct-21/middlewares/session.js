const { verifyToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    console.log(req.cookies);
    if (token) {
        try {
            const userData = verifyToken(token);
            req.user = userData;
            res.locals.email = userData.email;
        } catch (error) {
            console.log('Invalid token');

            res.clearCookie('token');
            res.redirect('/login');
            return;
        }
    }

    next();
};