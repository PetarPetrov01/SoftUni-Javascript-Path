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

async function editAd(id, data) {

    const ad = await Ad.findById(id);

    ad.headline = data.headline;
    ad.location = data.location;
    ad.companyName = data.companyName;
    ad.companyDescription = data.companyDescription;


    await ad.save();
}

async function apply(adId, userId) {
    const ad = await Ad.findById(adId);
    if (ad.applied.includes(userId)) {
        throw new Error('You can\'t apply twice');
    }

    if (ad.author == userId) {
        throw new Error('You can\'t apply to your own job');
    }

    ad.applied.push(userId);

    await ad.save();
}

async function searchAds(email) {
    const ads = await Ad.find({}).populate('author').lean();
    return ads.filter(a => a.author.email.match(new RegExp(email)));
}

module.exports = { getAll, getById, createAd, editAd, getFirstThree, apply, searchAds };