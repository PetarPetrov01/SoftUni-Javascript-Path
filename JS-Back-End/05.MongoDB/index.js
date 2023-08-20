const mongoose = require('mongoose')
const Person = require('./models/Person')

const connectionString = 'mongodb://localhost:27017/testdb'

start()
async function start() {

    await mongoose.connect(connectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    // const person = await Person
    //     .find({})
    //     .where({ age: {} })
    // console.log(person)

    const person2 = await Person
        .find({})
        .where('age').gte(12)

    console.log(person2)
    await mongoose.disconnect()
}