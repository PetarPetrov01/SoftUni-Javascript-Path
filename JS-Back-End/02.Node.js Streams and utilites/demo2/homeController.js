const fs = require('fs')

function homePage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    fs.createReadStream('./static/index.html').pipe(res)
}

function errorPage(req, res) {
    res.writeHead(404, {
        "Content-Type": "text/html"
    })
    fs.createReadStream('./static/error.html').pipe(res)
}

function sendFile(req, res) {
    if (req.url == '/site.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        })
        fs.createReadStream('./static/site.css').pipe(res)
    } else {
        res.writeHead(200,{
            "Content-Type": "image/jpg"
        })
        fs.createReadStream(`.${req.url}`).pipe(res)
    }
}

module.exports = { homePage, errorPage, sendFile } 