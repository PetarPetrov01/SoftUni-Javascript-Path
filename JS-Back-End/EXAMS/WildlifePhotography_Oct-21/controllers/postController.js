const { isUser } = require('../middlewares/guards');
const { Post } = require('../models/post');
const { getAll, createPost, getById, updatePost, getOwnPosts, upvote, downVote } = require('../services/postServices');
const { errorParser } = require('../utils/parser');

const postController = require('express').Router();

postController.get('/all-posts', async (req, res) => {
    const posts = await getAll();
    res.render('all-posts', {
        posts
    });
});
postController.get('/create', isUser(), (req, res) => {
    res.render('create');
});

postController.post('/create', isUser(), async (req, res) => {

    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await createPost(req.body, req.user._id);
        res.redirect('/post/all-posts');
    } catch (error) {
        res.render('create', {
            error: errorParser(error),
            body: req.body
        });
    }
});

