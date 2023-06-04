function netherRealms(input) {
    let demonsArr = input.split(/[, ]+/g).sort((a, b) => a.localeCompare(b))
    let namePattern = /[^+\-*\/.0-9]+/g
    let digitsPattern = /(?:[-+]{1})?\d+(?:\.\d+)?/g
    let dmgPattern = /[\/\*]/g

    let demons = {}

    for (let el of demonsArr) {
        let digits = el.match(digitsPattern)
        let dmg = el.match(dmgPattern)
        let health = 0
        let damage = 0

        if (el.match(namePattern) !== null) {
            let name = el.match(namePattern).join('')
            for (let ch of name) {
                health += ch.charCodeAt(0)
            }
        }

        if (digits !== null) {
            digits = digits.map(Number)
            damage = digits.reduce((acc, b) => acc + b, 0)
        }

        if (dmg !== null) {
            for (let el of dmg) {
                if (el === '*') {
                    damage *= 2
                } else if (el === '/') {
                    damage /= 2
                }
            }
        }
        demons[el] ={}
        demons[el]['health'] = health
        demons[el]['damage'] = damage
    }
    let finalArr = Object.entries(demons)
    .forEach(a=>console.log(`${a[0]} - ${a[1].health} health, ${(a[1].damage).toFixed(2)} damage`))
}
netherRealms('M3ph1st0**, Azazel')
netherRealms('M3ph-0.5s-0.5t0.0**')
netherRealms('Gos/ho')




function netherRealms(input) {
    let demonsArr = input.split(/[, ]+/g).sort((a, b) => a.localeCompare(b))
    let namePattern = /[^+\-*\/.0-9]+/g
    let digitsPattern = /(?:[-+]{1})?\d+(?:\.\d+)?/g
    let dmgPattern = /[\/\*]/g

    let finalArr = []

    for (let el of demonsArr) {
        let name = el.match(namePattern).join('')
        let digits = el.match(digitsPattern)
        let dmg = el.match(dmgPattern)
        let health = 0
        let damage = 0

        for (let ch of name) {
            health += ch.charCodeAt(0)
        }

        if (digits !== null) {
            digits = digits.map(Number)
            damage = digits.reduce((acc, b) => acc + b, 0)
        }

        if (dmg !== null) {
            for (let el of dmg) {
                if (el === '*') {
                    damage *= 2
                } else if (el === '/') {
                    damage /= 2
                }
            }
        }
        finalArr.push([el,health,damage])
    }
    finalArr.forEach((a)=>console.log(`${a[0]} - ${a[1]} health, ${a[2].toFixed(2)} damage `))
}