const { getAll } = require('../services/courseService');

const homeController = require('express').Router();

homeController.get('/', async (req, res) => {
    let courses = await getAll();

    if (req.user) {
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

    } else {
        courses.map(c => {
            c.users = c.users.length;
            return c;
        })
            .sort((a, b) => b.users - a.users);

        courses = courses.splice(0, Math.min(3, courses.length - 1));

        res.render('home-guest', {
            courses
        });
    }
});


module.exports = homeController;