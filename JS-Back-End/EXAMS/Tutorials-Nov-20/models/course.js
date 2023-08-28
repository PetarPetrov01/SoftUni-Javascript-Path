const { Schema, model, Types } = require('mongoose');

const courseSchema = new Schema({
    title: { type: String, required: true, unique: true, minLength: [4, 'Title must be atleast 4 characters long'] },
    description: { type: String, required: true, maxLength: 50, minLength: [20, 'Description must be atleast 20 characters long'] },
    imageUrl: { type: String, required: true, match: [/^https?:\/\/.+/i, 'Invalid image URL'] },
    duration: { type: String, required: true },
    createdAt: { type: Date, required: true },
    users: { type: [Types.ObjectId], ref: 'User', default: [] },
    ownerId: { type: Types.ObjectId, ref: 'User', required: true }
});

const Course = model('Course', courseSchema);

module.exports = { Course };