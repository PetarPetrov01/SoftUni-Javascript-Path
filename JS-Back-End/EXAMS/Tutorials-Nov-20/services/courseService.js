const { Course } = require('../models/course');

async function getAll() {
    const courses = await Course.find({}).lean();
    return courses;
}

async function getById(courseId) {
    const course = await Course.findById(courseId).lean();
    return course;
}

async function createCourse(body, ownerId) {
    let createdAt = new Date();

    const course = {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        duration: body.duration,
        createdAt,
        ownerId
    };
    console.log(course);
    await Course.create(course);
}

async function editCourse(id, body) {
    const course = await Course.findById(id); //DO NOT LEAN !!

    course.title = body.title;
    course.description = body.description;
    course.imageUrl = body.imageUrl;
    course.duration = body.duration;

    await course.save();
}

async function enrollOnCourse(courseId, userId) {
    const course = await Course.findById(courseId);
    console.log(course);
    if (course.users.includes(userId)) {
        throw new Error('You can\'t enroll twice!');
    }

    course.users.push(userId);
    await course.save();
}

async function searchCourse(title) {
    const courses = await Course.find({ title: new RegExp(title, 'i') }).lean();
    return courses;
}

module.exports = { getAll, createCourse, getById, editCourse, enrollOnCourse, searchCourse };

