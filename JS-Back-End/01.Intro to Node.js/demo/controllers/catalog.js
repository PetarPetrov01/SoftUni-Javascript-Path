const { IncomingForm } = require('formidable')
const { html } = require("../util.js")
const data = require("../data.json")

function catalogPage(req, res) {
    res.write(html(`
    <h1>Catalog</h1>
    <ul>
        ${data.map(p => `<li data-id="${p.id}">${p.name} is ${p.age} years old.</li>`).join('')}
    </ul>`))
    console.log(data)
    res.end()
}

function createPage(req, res) {
    res.write(html(`
    <h1>Add human</h1>
    <form method="POST" action="/create">
        <label>Name: <input type="text" name="name"> </label>
        <label>Age: <input type="number" name="age"> </label>
        <input type="submit" value="Create">
    </form>`))
    res.end()
}

function createHuman(req, res) {
    const form = new IncomingForm()

    form.parse(req, (err, fields) => {
        const human = {
            id: 'abc' + ('0000' + Math.floor(Math.random() * 9999)).slice(-4),
            name: fields.name,
            age: fields.age,
        }
        data.push(human)

        res.writeHead(301, ["Location", '/catalog'])
        res.end()
    })
}

module.exports = { catalogPage, createPage, createHuman }