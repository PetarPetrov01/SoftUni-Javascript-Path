function arena(input) {
    let gladiatorPool = {}

    for (el of input) {
        if (el === 'Ave Cesar') {
            break;
        }

        let battleEnd = false
        line = el.split(' ')

        if (line[1] === '->') {
            let [name, technique, power] = el.split(' -> ')
            if (!gladiatorPool.hasOwnProperty(name)) {
                gladiatorPool[name] = {}
                gladiatorPool[name][technique] = Number(power)
            } else if (!gladiatorPool[name].hasOwnProperty(technique) || gladiatorPool[name][technique] < power) {
                gladiatorPool[name][technique] = Number(power)
            }

        } else if (line[1] === 'vs') {
            let [first, second] = el.split(' vs ')

            if (!gladiatorPool.hasOwnProperty(first) || !gladiatorPool.hasOwnProperty(second)) {
                continue;
            }

            for (let fTech in gladiatorPool[first]) {
                if (battleEnd) {
                    break;
                }
                for (let sTech in gladiatorPool[second]) {
                    if (fTech === sTech) {
                        let firstPower = gladiatorPool[first][fTech]
                        let secondPower = gladiatorPool[second][sTech]
                        if (firstPower > secondPower) {
                            delete gladiatorPool[second]
                        } else {
                            delete gladiatorPool[first]
                        }
                        battleEnd = true
                        break;
                    }
                }
            }

        }
    }
    //SORTING
    let arr = Object.entries(gladiatorPool)
    for (let [gladiator, techniques] of arr) {
        let sum = 0
        for (let tech in techniques) {
            sum += gladiatorPool[gladiator][tech];
        }
        gladiatorPool[gladiator]['totalSkill'] = sum
    }

    let sorted = arr.sort((a, b) => {
        let aTotal = a[1]['totalSkill']
        let bTotal = b[1]['totalSkill']
        return bTotal - aTotal
    })

    for (let [gladiator, techniques] of sorted) {
        
        let techArr = Object.entries(techniques)
        let tot = techArr.pop()
        techArr.splice(0, 0, tot)
        techArr = techArr.sort((a, b) => b[1] - a[1])
        console.log(`${gladiator}: ${techArr[0][1]} skill`);
        techArr.shift()
        for (let tech of techArr){
            console.log(`- ${tech[0]} <!> ${tech[1]}`);
        }
    }
}
arena([
    'Peter -> Duck -> 400',
    'Julius -> Shield -> 150',
    'Gladius -> Heal -> 200',
    'Gladius -> Support -> 250',
    'Gladius -> Shield -> 250',
    'Peter vs Gladius',
    'Gladius vs Julius',
    'Gladius vs Maximilian',
    'Ave Cesar'
    ]
)