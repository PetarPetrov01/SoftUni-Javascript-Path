const { Post } = require('../models/post');


async function getAll() {
    return await Post.find({}).lean();
}

async function createPost(data, userId) {
}
async function getById(id) {
}

async function updatePost(id, data) {
}

async function getOwnPosts(id) {
}
async function upvote(postId, userId) {
}

async function downVote(postId, userId) {
}
module.exports = { getAll, createPost, getById, updatePost, getOwnPosts, upvote, downVote };