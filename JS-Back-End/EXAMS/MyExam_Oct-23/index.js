const express = require('express');

const expressConfig = require('./config/express');
const databaseConifg = require('./config/database');
const routes = require('./config/routes');

const app = express();

start();
async function start() {

    expressConfig(app);
    await databaseConifg(app);
    routes(app);

    app.listen(3000, () => console.log('Server listening on port 3000...'));
};