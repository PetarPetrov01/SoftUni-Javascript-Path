const router = require('express').Router();


router.get('/', async (req, res) => {
    res.render('index', { cubes, search, fromDifficulty, toDifficulty });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;

