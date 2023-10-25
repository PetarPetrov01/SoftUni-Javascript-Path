function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login'); // Not specified in the assignemnt ??
        }
    };
};

function isGuest() {
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/'); // Not specified in the assignemnt ??
        }
    };
}


module.exports = { isGuest, isUser, isOwner };