const router = require('express').Router()
const Cube = require('../models/cube')
const { createCube } = require('../services/cubeServices')

router.get('/', (req, res) => {
    res.render('create',)
})

router.post('/', async (req, res) => {
    const cube = req.body
    await createCube(cube)

    res.redirect('/')
})

module.exports = router