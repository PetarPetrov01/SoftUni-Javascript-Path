const mongoose = require('mongoose');

const CONNECT_URL = 'mongodb://localhost:27017/electronics';

module.exports = async (app) => {
    try {
        mongoose.connect(CONNECT_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Data base loaded');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};