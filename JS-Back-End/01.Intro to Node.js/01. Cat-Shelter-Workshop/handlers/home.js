const url = require('url');
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/' && req.method === 'GET') {
        const filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        console.log('File path:', filePath);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404, {
                    "Content-Type": 'text/plain'
                });
                res.write('404 Not found');
                res.end();
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.write(data);
            res.end();
            console.log('Response sent.');
        });
    } else {
        return true;
    }
};