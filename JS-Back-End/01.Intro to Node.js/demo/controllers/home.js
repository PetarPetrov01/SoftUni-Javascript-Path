const { html } = require("../util.js");

function homePage(req, res) {
    console.log('Calling gome')
    res.write(html(`
    <h1>Home page</h1>
    <p>Welcome to our site for something</p>`))
    res.end()
}

function defaultPage(req, res) {
    console.log('Writing default')
    res.write(html(`
    <h1>404 Not found</h1>`))
    res.end()

}

module.exports = { homePage, defaultPage }