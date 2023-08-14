const router = require('express').Router()

const { getGame, getById } = require('../services/gameService')

router.get('/', (req, res) => {
    const games = getGame()
    res.render('catalog', { games })
})

router.get('/:gameId', (req, res) => {
    const id = req.params.gameId

    const game = getById(id)
    if (game) {
        res.render('details', game)
    } else {
        res.render('missingGame', { id })
    }
})

module.exports = router