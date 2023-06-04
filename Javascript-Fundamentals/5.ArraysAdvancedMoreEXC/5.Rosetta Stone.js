function solve(input) {
    let templateMatrixRows = Number(input.shift());
    let templateMatrix = input
    .splice(0, templateMatrixRows)
    .map(row => row.split(' ').map(Number));

    let encodedMatrix = input.map(row => row.split(' ').map(Number))

    let templateMatrixColumns = templateMatrix[0].length

    for (let row = 0; row < encodedMatrix.length; row++) {
        for (let col = 0; col < encodedMatrix[row].length; col++) {
            encodedMatrix[row][col] += templateMatrix[row % templateMatrixRows][col % templateMatrixColumns]
            let currentNum = encodedMatrix[row][col] % 27

            if (currentNum !== 0) {
                encodedMatrix[row][col] = String.fromCharCode(currentNum + 64)
            } else {
                encodedMatrix[row][col] = ' '
            }
        }
    }

    let output = encodedMatrix.map(row => row.join('')).join('')
    console.log(output);

}
solve([ '2',
'31 32',
'74 37',
'19 0 23 25',
'22 3 12 17',
'5 9 23 11',
'12 18 10 22' ]

)