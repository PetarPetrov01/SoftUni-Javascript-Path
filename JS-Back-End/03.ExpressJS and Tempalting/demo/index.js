const catalogController = require('./controllers/catalogController')
const createController = require('./controllers/createController')
const deleteController = require('./controllers/deleteController')

const handlebars = hbr.create({
    extname: '.hbs'
})

const app = express()

app.engine('.hbs', handlebars.engine)
app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: false }))
app.use('/static', express.static('static'))

app.use(homeController)
