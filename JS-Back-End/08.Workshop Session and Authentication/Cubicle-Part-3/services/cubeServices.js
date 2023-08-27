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
}
async function createCube(cube, ownerId) {

    };

async function editCube(id, cube) {

    }

async function deleteCube(id) {
}
module.exports = { getCubes, getById, createCube, editCube, deleteCube };
