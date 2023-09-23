const { User } = require('../models/User');
const { Ad } = require('../models/ads');

async function getAll() {
    return await Ad.find({}).lean();
}

async function getFirstThree() {
    return await Ad.find({})
        .sort({ createdAt: 1 })
        .limit(3)
        .lean();
}

