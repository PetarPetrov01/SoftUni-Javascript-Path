const router = require('express').Router();
const { getCubes } = require('../services/cubeServices');


router.get('/', async (req, res) => {
    const search = req.query.search || '';
    const fromDifficulty = req.query.from || 1;
    const toDifficulty = req.query.to || 6;

    const cubes = await getCubes(search, fromDifficulty, toDifficulty);
    res.render('index', { cubes, search, fromDifficulty, toDifficulty });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

