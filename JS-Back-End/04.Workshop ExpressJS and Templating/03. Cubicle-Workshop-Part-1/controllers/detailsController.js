const router = require('express').Router()
const fs = require('fs')
const { getById } = require('../services/cubeServices')

router.get('/:id', (req, res) => {
    const cube = getById(req.params.id)
    res.render('details', { cube })
})

module.exports = router