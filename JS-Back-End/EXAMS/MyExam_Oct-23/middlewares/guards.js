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

function isOwner() {
    return (req, res, next) => {
        const userId = req.user?._id;
        
        if (res.locals.el.owner == userId) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

module.exports = { isGuest, isUser, isOwner };