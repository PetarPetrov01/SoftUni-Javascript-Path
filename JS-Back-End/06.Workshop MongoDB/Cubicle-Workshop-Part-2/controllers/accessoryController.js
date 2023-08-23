const router = require('express').Router();
const { createAccessory, getAllAccessories, attachAccessory } = require('../services/accessoryService');
const { getById } = require('../services/cubeServices');

router.get('/attach/:cubeId', async (req, res) => {
    const id = req.params.cubeId;
    const cube = await getById(id);
    const accessories = await getAllAccessories();
    res.render('accessoryAttach', { cube, accessories });
});


router.get('/create', (req, res) => {
    res.render('accessoryCreate');
});

router.post('/create', async (req, res) => {
    const accessory = req.body;
    const result = await createAccessory(accessory);
    res.redirect('/');
});

router.post('/attach/:cubeId', async (req, res) => {
    const id = req.params.cubeId;
    await attachAccessory(id, Object.values(req.body));
    res.redirect(`/accessory/attach/${id}`);
});

module.exports = router;