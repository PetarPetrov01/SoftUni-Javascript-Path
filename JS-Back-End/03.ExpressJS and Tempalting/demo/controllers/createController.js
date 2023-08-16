const { createGame } = require('../services/gameService')

const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('create')
})

router.post('/', async (req, res) => {

    await createGame(req.body)
    res.redirect('/catalog')
})

module.exports = router