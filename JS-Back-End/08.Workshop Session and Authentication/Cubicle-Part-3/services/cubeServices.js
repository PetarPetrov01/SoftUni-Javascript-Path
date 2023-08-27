const mongoose = require('mongoose');
const Cube = require('../models/cube');

function getCubes(search, fromLevel, toLevel) {
    const options = {};
    if (search) {
        options.name = new RegExp(search, 'i');
    }

    if (fromLevel) {
        options.difficultyLevel = { $gte: Number(fromLevel) };
    }

    if (toLevel) {
        if (!options.difficultyLevel) {
            options.difficultyLevel = {};
        } else {
            options.difficultyLevel.$lte = Number(toLevel);
        }
    }

    const cubes = Cube.find(options).lean();
    return cubes;
}

function getById(id) {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube;
}

async function createCube(cube, ownerId) {

    const newCube = {
        name: cube.name,
        description: cube.description,
        imageUrl: cube.imageUrl,
        difficultyLevel: Number(cube.difficultyLevel),
        ownerId: ownerId
    };

    if (Object.values(newCube).some(v => !v)) {
        throw new Error('All inputs must be filled!');
    }

    const result = await Cube.create(newCube);
    return result;
}

async function editCube(id, cube) {
    const newCube = {
        name: cube.name,
        description: cube.description,
        imageUrl: cube.imageUrl,
        difficultyLevel: Number(cube.difficultyLevel)
    };

    if (Object.values(newCube).some(v => !v)) {
        throw new Error('All inputs must be filled!');
    }

    await Cube.findByIdAndUpdate(id, newCube, { runValidators: true });
}

async function deleteCube(id) {
    await Cube.findByIdAndDelete(id);
}

module.exports = { getCubes, getById, createCube, editCube, deleteCube };

