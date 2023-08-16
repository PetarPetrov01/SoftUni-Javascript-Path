const { getById, deleteGame } = require('../services/gameService')

const router = require('express').Router()

router.get('/:gameId', (req, res) => {
    const id = req.params.gameId
    const game = getById(id)
    res.render('delete', game)
})

router.post('/:gameId', async (req, res) => {
    const id = req.params.gameId
    await deleteGame(id)

    res.redirect('/catalog')
})

module.exports = router;