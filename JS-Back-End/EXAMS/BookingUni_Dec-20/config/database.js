const mongoose = require('mongoose');

// TODO Change database name 
const CONNECT_URL = 'mongodb://localhost:27017/booking';

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