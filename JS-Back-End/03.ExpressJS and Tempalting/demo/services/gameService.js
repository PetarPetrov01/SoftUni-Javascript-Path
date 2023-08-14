const fs = require('fs')

const games = JSON.parse(fs.readFileSync('./services/data.json'))

function getGame() {
    return games
}

function getById(id) {
    return games.find(g => g.id == id)
}

async function createGame(game) {
    game.id = 'asdf' + ('0000' + (Math.random * 99999 | 0)).slice(-4)
    game.year = Number(game.year)
    games.push(game)

    await persist()
}

async function deleteGame(id) {
    const gameIndex = games.findIndex(g => g.id == id)
    games.splice(gameIndex, 1)

    await persist()
}

async function persist() {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            './services/data.json',
            JSON.stringify(games, null, 2),
            (err) => {
                if (err == null) {
                    resolve()
                } else {
                    reject()
                }
            })
    })
}




module.exports = { getGame, getById, createGame, deleteGame }
