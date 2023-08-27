const { body, validationResult } = require('express-validator');
const { getById, editCube, deleteCube } = require('../services/cubeServices');
const { errorParser } = require('../util/parser');
const router = require('express').Router();

router.get('/edit/:cubeId', async (req, res) => {
    const cube = await getById(req.params.cubeId);
    res.render('cube/edit', { cube });
    console.log('editing ' + cube);
});

router.get('/delete/:cubeId', async (req, res) => {
    const cube = await getById(req.params.cubeId);
    res.render('cube/delete', { cube });
});

router.post('/edit/:cubeId',
    body('name')
        .trim()
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Name can contain only English letters, digits, and whitespaces'),
    async (req, res) => {
        try {
            const { errors } = validationResult(req);

            if (errors.length > 0) {
                throw errors;
            }

            await editCube(req.params.cubeId, req.body);
            res.redirect(`/details/${req.params.cubeId}`);
        } catch (error) {
            res.render('cube/edit', {
                cube: req.body,
                error: errorParser(error)
            });
        }
    });

router.post('/delete/:cubeId', async (req, res) => {
    console.log('Deleting ' + req.params.cubeId);

    try {
        await deleteCube(req.params.cubeId);
        res.redirect('/');

    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;