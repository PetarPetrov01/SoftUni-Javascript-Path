const { isUser, isOwner } = require('../middlewares/guards');
bookController.get('/create', isUser(), (req, res) => {
    res.render('create', {
        title: 'Create',
    });
});

module.exports = bookController;