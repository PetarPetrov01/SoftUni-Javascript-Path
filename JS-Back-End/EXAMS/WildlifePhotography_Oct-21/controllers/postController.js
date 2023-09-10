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
