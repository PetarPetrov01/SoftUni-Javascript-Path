function errorParser(error) {
    const result = [];
    console.log('Here --->');

    if (Array.isArray(error)) {
        //from express-validator
        error.forEach(e => result.push(e.msg));
    } else if (error.name == 'ValidationError') {
        for (let [field, e] of Object.entries(error.errors)) {
            result.push(e.message);
        }
    } else {
        result.push(error.message);
    }

    return result;
}
module.exports = { errorParser };