const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        minLength: [3,'Username should be atleast 3 charatcers long']
    },
    email: {
        type: String,
        required: true,
        minLength: [10,'Email should be atleast 10 charatcers long']
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

const User = model('User', userSchema);

module.exports = { User };