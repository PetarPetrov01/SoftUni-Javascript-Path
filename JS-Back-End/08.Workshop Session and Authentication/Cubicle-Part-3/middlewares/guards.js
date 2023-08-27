function isUser(req, res, next) {
    if (req.user == undefined) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}


module.exports = { isUser };