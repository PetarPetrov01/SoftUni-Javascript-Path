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
    return await Post.find({ author: id }).lean().populate('author');
}

async function upvote(postId, userId) {
    const post = await Post.findById(postId);
    
    if (post.votes.includes(userId) == true) {
        throw new Error('You already voted!');
    }
    post.rating++;
    post.votes.push(userId);

    await post.save();
}

async function downVote(postId, userId) {
    const post = await Post.findById(postId);
    
    if (post.votes.includes(userId) == true) {
        throw new Error('You already voted!');
    }

    post.rating--;
    post.votes.push(userId);

    await post.save();
}


module.exports = { getAll, createPost, getById, updatePost, getOwnPosts, upvote, downVote };