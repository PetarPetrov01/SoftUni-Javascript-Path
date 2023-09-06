const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true, match: [/^[A-Z][a-z]+\ [A-Z][a-z]+$/, 'Invalid name. Must be in the format "Firstname Lastname"'] },
    username: { type: String, required: true, minLength: [5, 'Username msut be atleast 5 characters long!'] },
    hashedPassword: { type: String, required: true }
});

const User = model('User', userSchema);

module.exports = { User };