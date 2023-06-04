function race(input) {
    let runners = input.shift().split(', ')

    let final = {}

    let nameReg = /[A-Za-z]/g
    let kmReg = /[0-9]/g

    for (let string of input) {

        if (string === 'end of race') {
            break;
        }

        let namesArr = string.match(nameReg)
        let name = namesArr.join('')

        if (!runners.includes(name)) {
            continue
        }

        let kmArr = string.match(kmReg)
        let km = kmArr.map(Number).reduce((acc, b) => acc + b, 0)

        if (final.hasOwnProperty(name)) {
            final[name] += km
        } else {
            final[name] = km
        }
    }
    let sorted = Object.entries(final)
        .sort((a, b) => b[1] - a[1])
    console.log(`1st place: ${sorted[0][0]}`)
   console.log(`2nd place: ${sorted[1][0]}`)
    console.log(`3rd place: ${sorted[2][0]}`)
}
    // let endIndex = Math.min(3, sorted.length)
    // sorted = sorted.slice(0, endIndex)

    // for (let i = 1; i <= sorted.length; i++){
    //     console.log(`${ i }.`);
    // }

//}
race(['George, Peter, Bill, Tom',
    'G4e@55or%6g6!68e!!@ ',
    'R1@!3a$y4456@',
    'B5@i@#123ll',
    'G@e54o$r6ge#',
    '7P%et^#e5346r',
    'T$o553m&6',
    'end of race']
)