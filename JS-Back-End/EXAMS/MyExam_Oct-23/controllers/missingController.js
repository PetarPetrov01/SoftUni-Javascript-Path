const missingController = require('express').Router();

missingController.get('*', (req, res) => {
    res.render('404',{
        title: '404 Not Found'
    });
});

module.exports = missingController;