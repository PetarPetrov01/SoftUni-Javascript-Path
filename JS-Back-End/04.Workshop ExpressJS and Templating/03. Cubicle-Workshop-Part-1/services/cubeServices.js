const fs = require('fs')
const Cube = require('../models/cube')

const cubes = JSON.parse(fs.readFileSync('./config/database.json'))

function getCubes(search, fromLevel, toLevel) {
    search = search.toLowerCase()
    return cubes
        .filter(c => c.name.toLowerCase().includes(search))
        .filter(c => c.difficultyLevel >= fromLevel && c.difficultyLevel <= toLevel)
}

function getById(id) {
    return cubes.find(c => c.id == id)
}

async function createCube(cube) {
    cubes.push(new Cube(cube))

    await persist()
}

async function persist() {
    return new Promise((res, rej) => {
        fs.writeFile(
            './config/database.json',
            JSON.stringify(cubes, null, 2),
            (err) => {
                if (err == null) {
                    res()
                } else {
                    rej()
                }
            })
    })
}

module.exports = { getCubes, getById, createCube }

