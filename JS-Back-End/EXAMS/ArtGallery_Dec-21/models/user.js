const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, minLength: [4, 'Username must be atleast 4 characters long'] },
    hashedPassword: { type: String, required: true },
    address: { type: String, required: true, maxLength: [20, 'The address should not exceed 20 characters in length.'] },
    publications: { type: [Types.ObjectId], ref: 'Publication', default: [] }
});

const User = model('User', userSchema);

module.exports = { User };