const { createReadStream, promises: fs } = require('fs')

async function catalogPage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    const layout = await fs.readFile('./static/catalog.html')
    res.write(layout.toString().replace('<%%imageslist%%>', await getImages()))
    res.end()
}

async function getImages() {
    const images = await fs.readdir('./img')

    return `<ul>${images.map(cardImage).join('')}</ul>`
}

function cardImage(img) {
    return `<li><img src="./img/${img}"></li>`
}



module.exports = { catalogPage }