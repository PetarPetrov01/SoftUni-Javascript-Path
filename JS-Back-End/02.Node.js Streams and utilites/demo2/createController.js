const fs = require('fs')
const formidable = require('formidable')

function createPage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    })
    fs.createReadStream('./static/create.html').pipe(res)
}

function postImage(req, res) {
    const form = new formidable.IncomingForm();

    form.on('file', (name, file) => {
        console.log('on file');
        const temp = file.path;
        console.log(temp)

        // Move the uploaded file to the designated folder (e.g., designated-folder/image.jpg)
    });

    form.on('end', () => {
        console.log('Ended');
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.end('Error uploading file.');
        }
    });
}

module.exports = { createPage, postImage }