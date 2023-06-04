function pollution(matrix, events) {
    let map = matrix.map(str => str.split(' ').map(Number))
    let resultMap = map.slice()
    let printArr = []

    for (element of events) {
        let forces = element.split(' ')
        let force = forces[0]
        switch (force) {
            case 'breeze':
                let row = forces[1]
                for (let col = 0; col < 5; col++) {
                    resultMap[row][col] -= 15

                    if (resultMap[row][col] < 0) {
                        resultMap[row][col] = 0
                    }
                }
                break;
            case 'gale':
                let col = forces[1]
                for (let row = 0; row < 5; row++) {
                    resultMap[row][col] -= 20

                    if (resultMap[row][col] < 0) {
                        resultMap[row][col] = 0
                    }
                }

                break;
            case 'smog':
                resultMap = resultMap.map(row => row.map(el => el + Number(forces[1])))
                break;
        }

    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {

            if (resultMap[i][j] >= 50) {
                printArr.push(`[${i}-${j}]`)
            }
        }
    }
    if (printArr.length === 0) {
        console.log('No polluted areas');
    } else {
        console.log(`Polluted areas: ${printArr.join(', ')}`)
    }
}
pollution(['5 7 2 14 4',
    '21 14 2 5 3',
    '3 16 7 42 12',
    '2 20 8 39 14',
    '7 34 1 10 24'],
    ['breeze 1', 'gale 2', 'smog 35']

)
