function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login'); // TODO Check redirection
        }
    };
};

function isGuest() {
    return (req, res, next) => {
        console.log(req.user);
        if (!req.user) {
            next();
        } else {
            res.redirect('/'); // TODO Check for redirect
        }
    };
}

module.exports = { isGuest, isUser };