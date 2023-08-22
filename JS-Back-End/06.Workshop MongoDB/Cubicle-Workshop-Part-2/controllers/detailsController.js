const router = require('express').Router();
const { getById } = require('../services/cubeServices');

router.get('/:id', async (req, res) => {
    const cube = await getById(req.params.id);
    res.render('details', { cube });
});

module.exports = router;