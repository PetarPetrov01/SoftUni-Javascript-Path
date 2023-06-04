function cards(input) {
    let players = {}

    for (let row of input) {
        row = row.split(': ')
        let name = row.shift()
        row = row[0].split(', ')
        if (!players.hasOwnProperty(name)) {
            players[name] = []
        }
        for (let card of row) {
            if (players[name].includes(card)) {
                continue;
            }
            players[name].push(card)
        }
    }

    for (let player in players) {
        let sumPoints = 0

        for (let card of players[player]) {
            card = card.split('')
            let type = card.pop()
            let power = card.join('')
            let currentCardPoints = 0

            switch (power) {
                case 'A':
                    power = 14
                    break;
                case 'K':
                    power = 13
                    break;
                case 'Q':
                    power = 12
                    break;
                case 'J':
                    power = 11
                    break;
                default:
                    power = Number(power)
                    break;
            }

            switch (type) {
                case 'S':
                    currentCardPoints = power * 4
                    break;
                case 'H':
                    currentCardPoints = power * 3
                    break;
                case 'D':
                    currentCardPoints = power * 2
                    break;
                case 'C':
                    currentCardPoints = power * 1
                    break;
            }
            sumPoints += currentCardPoints
        }
        console.log(`${player}: ${sumPoints}`);
    }
}
cards([
    'John: 2C, 4H, 9H, AS, QS',
    'Slav: 3H, 10S, JC, KD, 5S, 10S',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Slav: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'John: JD, JD, JD, JD'
]

)

//MORE OBJECTS INSTEAD OF SWITCH
function cardsObj(input) {
    let powersObj = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'J': 11,
        'Q': 12,
        'K': 13,
        'A': 14
    }

    let typesObj = {
        'S': 4,
        'H': 3,
        'D': 2,
        'C': 1
    }
    let players = {}

    for (let row of input) {
        row = row.split(': ')
        let name = row.shift()
        row = row[0].split(', ')
        if (!players.hasOwnProperty(name)) {
            players[name] = []
        }
        for (let card of row) {
            if (players[name].includes(card)) {
                continue;
            }
            players[name].push(card)
        }
    }

    for (let player in players) {
        let sumPoints = 0

        for (let card of players[player]) {
            card = card.split('')
            let type = card.pop()
            let power = card.join('')
            sumPoints += typesObj[type]*powersObj[power]
        }
        console.log(`${player}: ${sumPoints}`);
    }
}
cardsObj([
    'John: 2C, 4H, 9H, AS, QS',
    'Slav: 3H, 10S, JC, KD, 5S, 10S',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Slav: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'Alex: 6H, 7S, KC, KD, 5S, 10C',
    'Thomas: QH, QC, JS, JD, JC',
    'John: JD, JD, JD, JD'
])
