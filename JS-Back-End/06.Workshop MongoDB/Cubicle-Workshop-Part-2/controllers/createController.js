const router = require('express').Router()
const Cube = require('../models/cube')
const { createCube } = require('../services/cubeServices')

router.get('/', (req, res) => {
    res.render('create',)
})

router.post('/', async (req, res) => {

    try {
        const result = await createCube(req.body)
        res.redirect(`/details/${result._id}`)
        console.log('Creation complete')
    } catch (error) {
        res.render('create', {
            title: "Error",
            error: error.message
        })
    }

})


module.exports = router