function starEnigma(input) {
    let messages = Number(input.shift())
    let attackedPlanets = []
    let destroyedPlanets = []

    for (let el of input) {

        let count = 0
        let elArr = el.split('')

        for (let ch of elArr) {
            let currChar = ch.toLowerCase()

            if (currChar.match(/[star]/g)) {
                count++
            }
        }

        for (let i = 0; i < elArr.length; i++) {
            let newCh = elArr[i].charCodeAt(0) - count
            let result = String.fromCharCode(newCh)
            elArr[i] = result
        }
        let newLine = elArr.join('')
        let regex = /@(?<planet>[A-Za-z]+)[^@:!\->]*:(?<population>\d+)[^@:!\->]*!(?<attack>[A|D])![^@:!\->]*\->(?<soldier>\d+)/g
        
        let match = regex.exec(newLine)
        if (match !== null) {
            let { planet, population, attack, soldiers } = match.groups
            let arr = [planet, population, attack, soldiers]

            if (attack === 'A') {
                attackedPlanets.push(arr)
            } else if (attack === 'D') {
                destroyedPlanets.push(arr)
            }
        }
    }
    console.log(`Attacked planets: ${attackedPlanets.length}`)
    attackedPlanets = attackedPlanets.sort((a, b) => a[0].localeCompare(b[0]))
        .forEach((el) => console.log(`-> ${el[0]}`))

    console.log(`Destroyed planets: ${destroyedPlanets.length}`)
    destroyedPlanets = destroyedPlanets.sort((a, b) => a[0].localeCompare(b[0]))
        .forEach((el) => console.log(`-> ${el[0]}`))
}

starEnigma(['3',
    "tt(''DGsvywgerx>6444444444%H%1B9444",
    'GQhrr|A977777(H(TTTT',
    'EHfsytsnhf?8555&I&2C9555SR']
)
