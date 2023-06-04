function solve(input) {
    let targets = input.shift().split(' ').map(Number)

    for (el of input) {
        if (el === 'End') {
            break;
        }
        commandsArr = el.split(' ')
        command = commandsArr[0]
        index = Number(commandsArr[1])
        value = Number(commandsArr[2])

        switch (command) {
            case 'Shoot':
                if (index >= 0 && index < targets.length) {
                    targets[index] -= value
                }

                if (targets[index]<=0) {
                    targets.splice(index, 1)
                }
                break;
            case 'Add':
                if (index >= 0 && index < targets.length) {
                    targets.splice(index, 0, value)
                } else {
                    console.log('Invalid placement!');
                }
                break;
            case 'Strike':
                if (index - value >= 0 && index + value < targets.length) {
                    let targetsToRemove = value * 2 + 1
                    targets.splice(index-value, targetsToRemove)
                } else {
                    console.log('Strike missed!')
                }
                break;
        }
    }
    console.log(targets.join('|'));
}
solve(["1 2 3 4 5",
"Strike 0 1",
"End"])

