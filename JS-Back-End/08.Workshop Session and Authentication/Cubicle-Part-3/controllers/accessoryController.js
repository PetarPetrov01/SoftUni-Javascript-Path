const router = require('express').Router();
const { createAccessory, getAllAccessories, attachAccessory } = require('../services/accessoryService');
const { getById } = require('../services/cubeServices');

router.get('/create', (req, res) => {
    res.render('accessoryCreate');
});

router.post('/create', async (req, res) => {
    const accessory = req.body;
    const result = await createAccessory(accessory);
    res.redirect('/');
});

module.exports = router;