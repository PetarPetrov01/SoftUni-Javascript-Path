const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middlewares/cors');
const userController = require('./controllers/userController');
const session = require('./middlewares/session');
const trimBody = require('./middlewares/trimBody');
const furnitureController = require('./controllers/furnitureController');


const connectionString = 'mongodb://localhost:27017/furniture';
start();

async function start() {
    await mongoose.connect(connectionString);
    console.log('Connected to database');

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(session());
    app.use(trimBody());

    app.use('/users', userController);
    app.use('/data/catalog', furnitureController);

    app.listen(3030, () => console.log('Server started on 3030'));
}

