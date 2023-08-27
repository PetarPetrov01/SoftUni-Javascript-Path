const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];

//create server
const app = require('express')();

const expressConifg = require('./config/express');
const routes = require('./config/routes');
const databaseConfig = require('./config/database');

async function start() {
    expressConifg(app);
    routes(app);
    await databaseConfig(app);

    //start server
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
}
start();
