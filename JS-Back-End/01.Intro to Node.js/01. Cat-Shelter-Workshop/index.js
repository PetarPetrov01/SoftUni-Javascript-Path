const http = require('http')
const port = 3000
const handlers = require('./handlers')

const server = http.createServer((req, res) => {
    for (let handler of handlers) {
        console.log(handlers)
        if (!handler(req, res)) {
            break;
        }
    }
    res.end()
}).listen(port)

