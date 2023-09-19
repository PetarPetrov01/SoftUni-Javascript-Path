const missingController = require('express').Router();

missingController.get('/', (req, res) => {
    res.render('404', {
        title: 'Missing page'
    });
});

module.exports = missingController;