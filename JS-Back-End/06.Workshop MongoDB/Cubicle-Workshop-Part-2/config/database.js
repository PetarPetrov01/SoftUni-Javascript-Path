const mongoose = require('mongoose');


const connString = 'mongodb://localhost:27017/cubicle';
module.exports = async (app) => {
    try {
        await mongoose.connect(connString, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready.');
    } catch (error) {
        console.error(error.message);
        process.exit(1);

    }
};