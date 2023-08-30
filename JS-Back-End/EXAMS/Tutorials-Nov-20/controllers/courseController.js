const { Course } = require('../models/course');
const { createCourse, getById, editCourse, enrollOnCourse, searchCourse } = require('../services/courseService');
const { errorParser } = require('../utils/parser');

const courseController = require('express').Router();

courseController.get('/:id/details', async (req, res) => {
    const course = await getById(req.params.id);

    if (course.ownerId == req.user._id) {

        course.isOwner = true;
    } else if (course.users.map(u => u.toString()).includes(req.user._id.toString())) {
        course.isEnrolled = true;
    }


    res.render('details', {
        course
    });

});

courseController.get('/create', (req, res) => {
    res.render('create');
});

courseController.get('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);

    if (course.ownerId != req.user._id) {
        return res.redirect('/');
    }

    res.render('edit', { course });
});

courseController.post('/create', async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }
        await createCourse(req.body, req.user._id);
        res.redirect('/');
    } catch (error) {
        res.render('create', {
            error: errorParser(error),
            body: req.body
        });
    }
});

courseController.post('/:id/edit', async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await editCourse(req.params.id, req.body);

        res.redirect(`/course/${req.params.id}/details`);
    } catch (error) {
        const course = req.body;
        course._id = req.params.id;

        res.render('edit', {
            error: errorParser(error),
            course
        });
    }
});

courseController.get('/:id/delete', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

courseController.get('/:id/enroll', async (req, res) => {
    const course = await getById(req.params.id);
    console.log(req.user);
    try {
        if (course.ownerId == req.user._id) {
            course.isEnrolled = true;
            throw new Error('You can\'t enroll in your own course!');
        }

        await enrollOnCourse(req.params.id, req.user._id);
        res.redirect(`/course/${req.params.id}/details`);
    } catch (error) {
        res.render('details', {
            error: errorParser(error),
            course
        });
    }
});

courseController.post('/search', async (req, res) => {
    const courses = await searchCourse(req.body.title);
    courses
        .sort((a, b) => b.createdAt - a.createdAt)
        .map(c => {
            c.createdAt = c.createdAt
                .toString()
                .slice(0, c.createdAt.toString().indexOf('GMT'))
                .trim();
            return c;
        });
    res.render('home-user', {
        courses
    });
});



module.exports = courseController;