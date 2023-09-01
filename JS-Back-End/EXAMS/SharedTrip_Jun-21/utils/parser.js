function errorParser(error) {
    if (error.name == 'ValidationError') {
        //Error coming from monggose validation
        console.log('Caught mongoose error');
        return Object.values(error.errors).map(e => e.message);
    } else {
        //Custom thrown error
        console.log('Caught custom error');
        return error.message.split('\n');
    }
};

module.exports = { errorParser };