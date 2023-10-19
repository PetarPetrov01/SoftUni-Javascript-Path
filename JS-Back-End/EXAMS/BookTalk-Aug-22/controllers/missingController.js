const missingController = require('express').Router();

missingController.get('*', (req, res) => {
    res.render('404',{
        title: '404'
    });
});

module.exports = missingController;