const { Course } = require('../models/course');
async function getAll() {
    const courses = await Course.find({}).lean();
    return courses;
}
async function getById(courseId) {
}
async function editCourse(id, body) {
}
async function enrollOnCourse(courseId, userId) {
}
async function searchCourse(title) {
}
module.exports = { getAll, createCourse, getById, editCourse, enrollOnCourse, searchCourse };
