const Accessory = require('../models/accessory')
const Cube = require('../models/cube')

function getAllAccessories() {
    const result = Accessory.find({}).lean()
    return result
}

function createAccessory(accessory) {

    const result = Accessory.create(accessory)
    return result
}
async function attachAccessory(cubeId, accessoryIds) {

}
//console.log(cube + '\n' + accessory)
module.exports = { getAllAccessories, createAccessory, attachAccessory }