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

postController.get('/:id/details', async (req, res) => {
    const post = await getById(req.params.id);

    post.authorNames = `${post.author.firstName} ${post.author.lastName}`;
    if (req.user) {
        post.isOwner = post.author._id == req.user._id;
        post.hasVoted = post.votes.some(v => v._id == req.user._id);
    }

    if (post.votes.length > 0) {
        post.votes = post.votes.map(v => v.email).join(', ');
    }

    res.render('details', {
        post
    });

});

postController.get('/:id/edit', isUser(), async (req, res) => {
    const post = await getById(req.params.id);

    if (req.user && post.author._id != req.user._id) {
        res.redirect('/post/all-posts');
    }

    res.render('edit', {
        post
    });
});

postController.post('/:id/edit', isUser(), async (req, res) => {
    try {
        if (Object.values(req.body).some(v => v == '')) {
            throw new Error('All inputs must be filled!');
        }

        await updatePost(req.params.id, req.body);
        res.redirect(`/post/${req.params.id}/details`);
    } catch (error) {
        let post = req.body;
        post._id = req.params.id;

        res.render('edit', {
            error: errorParser(error),
            post
        });
    }
});

postController.get('/:id/delete', isUser(), async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/all-posts');
});

