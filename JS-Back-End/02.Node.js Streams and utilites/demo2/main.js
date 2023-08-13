const { catalogPage } = require('./catalog.js')
function handleRequest(req, res) {

    let handler;
    if (req.url == '/site.css' || req.url.slice(0, 4) == '/img') {
        handler = sendFile
    } else if (req.url == '/' || req.url == '/index.html') {
        handler = homePage
    } else if (req.url == '/catalog') {
        handler = catalogPage
    }
    } else {
        handler = errorPage
    }

    handler(req, res)

}

module.exports = { handleRequest }