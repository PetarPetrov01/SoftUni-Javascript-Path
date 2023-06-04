function solve(inputArr) {
    let train = inputArr.shift().split(' ').map(Number)
    let maxCapacity = Number(inputArr.shift())
    for (commands of inputArr) {
        let currentCommand = commands.split(' ')

        if (currentCommand[0] === 'Add') {
            train.push(currentCommand[1])
        } else {
            for (wagoon of train) {
                let index = train.indexOf(wagoon)
                let people = Number(currentCommand[0])
                if (people + wagoon <= maxCapacity) {
                    train[index] += people
                    break;
                }
            }
        }
    }
    console.log(train.join(' '));
}
solve(['0 0 0 10 2 4',
'10',
'Add 10',
'10',
'10',
'10',
'8',
'6'])
