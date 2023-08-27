const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { createCube } = require('../services/cubeServices');
const { errorParser } = require('../util/parser');

router.get('/', (req, res) => {
    res.render('cube/create');
});

router.post('/',
    body('name')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Name can contain only English letters, digits, and whitespaces'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);
            console.log(errors);
            if (errors.length > 0) {
                throw errors;
            }

            const result = await createCube(req.body, req.user._id);
            res.redirect(`/details/${result._id}`);
            console.log('Creation complete');
        } catch (error) {
            res.render('cube/create', {
                title: 'Error',
                error: errorParser(error),
                body: req.body
            });
        }

    });


module.exports = router;