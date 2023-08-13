const url = require('url')
const fs = require('fs');
const { catalogPage } = require('./catalog.js')
const { homePage, errorPage, sendFile } = require('./homeController.js')
const { createPage, postImage } = require('./createController.js');


function handleRequest(req, res) {

    let handler;
    if (req.url == '/site.css' || req.url.slice(0, 4) == '/img') {
        handler = sendFile
    } else if (req.url == '/' || req.url == '/index.html') {
        handler = homePage
    } else if (req.url == '/catalog') {
        handler = catalogPage
    }
    else if (req.url == '/create') {
        handler = createPage
    } else if (req.method == 'POST') {
        handler = postImage
    } else {
        handler = errorPage
    }

    handler(req, res)

}

module.exports = { handleRequest }