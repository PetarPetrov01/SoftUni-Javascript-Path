const { Post } = require('../models/post');


async function getAll() {
    return await Post.find({}).lean();
}

async function createPost(data, userId) {
    const post = {
        title: data.title,
        keyword: data.keyword,
        location: data.location,
        dateOfCreation: data.dateOfCreation,
        image: data.image,
        description: data.description,
        author: userId,
    };

    await Post.create(post);
}

async function getById(id) {
    return await Post.findById(id).lean().populate('author votes');
}

async function updatePost(id, data) {
    const post = await Post.findById(id);

    post.title = data.title;
    post.keyword = data.keyword;
    post.location = data.location;
    post.dateOfCreation = data.dateOfCreation;
    post.image = data.image;
    post.description = data.description;

    await post.save();
}

async function getOwnPosts(id) {
}
async function upvote(postId, userId) {
}

async function downVote(postId, userId) {
}
module.exports = { getAll, createPost, getById, updatePost, getOwnPosts, upvote, downVote };