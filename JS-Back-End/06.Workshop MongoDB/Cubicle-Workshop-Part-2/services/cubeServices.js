const Cube = require('../models/cube');


function getCubes(search, fromLevel, toLevel) {
    const cubes = Cube.find({}).lean();
    return cubes;
}

function getById(id) {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube;
}

async function createCube(cube) {

    const newCube = {
        name: cube.name,
        description: cube.description,
        imageUrl: cube.imageUrl,
        difficultyLevel: Number(cube.difficultyLevel)
    };

    if (Object.values(newCube).some(v => !v)) {
        throw new Error('All inputs must be filled!');
    }

    const result = await Cube.create(newCube);
    return result;
}


module.exports = { getCubes, getById, createCube };

