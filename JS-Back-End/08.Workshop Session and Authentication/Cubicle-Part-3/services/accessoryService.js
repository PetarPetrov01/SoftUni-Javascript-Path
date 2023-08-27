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
    const cube = await Cube.findById(cubeId)
    const accessory = await Accessory.findById(accessoryIds[0])

    cube.accessories.push(accessory)
    accessory.cubes.push(cube)

    await cube.save()
    await accessory.save()

}
//console.log(cube + '\n' + accessory)
module.exports = { getAllAccessories, createAccessory, attachAccessory }