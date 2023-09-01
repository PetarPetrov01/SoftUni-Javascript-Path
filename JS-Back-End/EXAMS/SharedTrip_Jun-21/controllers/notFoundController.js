const notFoundController = require('express').Router();

notFoundController.get('*',(req,res)=>{
    res.render('404',{
        title:'Page not found'
    });
});

module.exports = notFoundController;