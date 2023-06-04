function kill(arr) {

    let bombBunniesCoords = arr.pop().split(' ').map(str => str.split(',').map(Number))
    let matrixOfBunnies = arr.map(row => row.split(' ').map(Number))

    let killCount = 0
    let totalDamage = 0

    for (let i = 0; i < bombBunniesCoords.length; i++) {
        let bombX = bombBunniesCoords[i][0]
        let bombY = bombBunniesCoords[i][1]
        let bombDamage = Number(matrixOfBunnies[bombX][bombY])

        if (bombDamage <= 0) {
            continue;
        }

        let staringRow = Math.max(0, bombX - 1)
        let endingRow = Math.min(bombX + 1, matrixOfBunnies.length - 1)
        for (let row = staringRow; row <= endingRow; row++) {

            let staringCol = Math.max(0, bombY - 1)
            let endingCol = Math.min(bombY + 1, matrixOfBunnies[row].length - 1)
            for (let col = staringCol; col <= endingCol; col++) {
                matrixOfBunnies[row][col] -= bombDamage
            }
        }
        killCount++
        totalDamage += bombDamage

    }

    for (let row = 0; row < matrixOfBunnies.length; row++) {
        for (let col = 0; col < matrixOfBunnies[row].length; col++) {
            if (matrixOfBunnies[row][col] > 0) {
                totalDamage += matrixOfBunnies[row][col]
                killCount++
            }
        }
    }
    console.log(`${totalDamage} \n${killCount}`);
}

kill(
    ['5 10 15 20',
        '10 10 10 10',
        '10 15 10 10',
        '10 10 10 10',
        '2,2 0,1']

)