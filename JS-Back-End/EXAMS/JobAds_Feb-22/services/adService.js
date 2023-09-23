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

async function getById(id) {
    return await Ad.findById(id).lean().populate('author applied');
}

async function createAd(data, userId) {
    const user = await User.findById(userId);
    const createdAt = new Date();

    const ad = {
        headline: data.headline,
        location: data.location,
        companyName: data.companyName,
        companyDescription: data.companyDescription,
        createdAt: Number(createdAt.getTime()),
        author: userId,
        applied: data.applied
    };

    const createdAd = await Ad.create(ad);
    user.ownAds.push(createdAd._id);
    await user.save();

}
