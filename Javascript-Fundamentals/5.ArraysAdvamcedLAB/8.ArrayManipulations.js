function solve(inputArr) {
    let resultArr = inputArr.shift().split(' ').map(Number)
    let commandsArr = inputArr.slice()

    for (i = 0; i < commandsArr.length; i++) {
        let commandAndNum = commandsArr[i].split(' ')
        let command = commandAndNum.shift()
        let num = commandAndNum.slice().map(Number)
        switch (command) {
            case 'Add':
                resultArr.push(num[0])
                break;
            case 'Remove':
                for (j = 0; j < resultArr.length; j++){
                    if (resultArr[j]===num[0]) {
                        resultArr.splice(i,1)
                    }
                }
                break;
            case 'RemoveAt':
                resultArr.splice(num[0], 1)
                break;
            case 'Insert':
                resultArr.splice(num[1], 0, num[0])
                break;
        }
    }
    console.log(resultArr.join(' '));
}
solve(['6 12 2 65 6 42',
'Add 8',
'Remove 12',
'RemoveAt 3',
'Insert 6 2']
)