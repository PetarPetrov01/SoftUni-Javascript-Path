const http = require('http')
const { handleRequest } = require('./main.js')

const server = http.createServer(handleRequest)

server.listen(3000)
