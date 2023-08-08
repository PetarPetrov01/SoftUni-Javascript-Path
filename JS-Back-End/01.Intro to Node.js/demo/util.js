function html(body) {
    console.log(body)
    return `<!DOCTYPE html>
    <html lang="en">
    <body>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/create">Create</a></li>
    </ul>
        ${body}
    </body>
    </html>`
}

module.exports = {
    html
}