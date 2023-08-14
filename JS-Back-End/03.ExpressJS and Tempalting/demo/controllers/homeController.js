const router = require('express').Router()

router.get('/', (req, res) => {
    res.render('home', { title: 'Jury' })
})

router.get('/about', (req, res) => {
    res.render('about')
})


module.exports = router 