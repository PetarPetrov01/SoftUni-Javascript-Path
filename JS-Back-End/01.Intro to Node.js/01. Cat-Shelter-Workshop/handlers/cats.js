const url = require('url')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const breeds = require('../data/breeds.json')
const cats = require('../data/cats.json')


module.exports = (req, res) => {
    let pathname = url.parse(req.url).pathname

    if (pathname == '' && req.method == 'GET') {
        const file = fs.createReadStream('../views/home/index.html').pipe(res)
    }
}
