const http = require('http')
const router = require('./router')
const { defaultPage, homePage } = require('./controllers/home')
const { catalogPage, createPage, createHuman } = require('./controllers/catalog')

router.get('/', homePage)
router.get('/catalog', catalogPage)
router.get('/create', createPage)
router.post('/create', createHuman)
router.get('default', defaultPage)

const server = http.createServer(router.match)
server.listen(3000)

