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
        if (!req.user) {
            next();
        } else {
            res.redirect('/'); // TODO Check for redirect
        }
    };
}

function isOwner() {
    return (req, res, next) => {
        const userId = req.user?._id;
        // TODO Change corresponding to assignment
        if (res.locals.creature.ownerId == userId) {
            next();
        } else {
            res.redirect('/');
        }
    };
}

module.exports = { isGuest, isUser, isOwner };