const router = require('express').Router();
const { getById } = require('../services/cubeServices');

router.get('/:id', async (req, res) => {
    const cube = await getById(req.params.id);

    if (req.user && req.user._id == cube.ownerId) {
        cube.isOwner = true;
    }

    if (cube) {
        res.render('cube/details', { cube });
    } else {
        res.render('404');
    }
});

module.exports = router;