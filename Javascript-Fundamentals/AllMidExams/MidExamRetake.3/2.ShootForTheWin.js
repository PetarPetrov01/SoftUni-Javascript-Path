function solve(input) {
    let sequnce = input.shift().split(' ').map(Number)
    let shotTargets = 0

    for (index of input) {
        if (index === 'End') {
            break;
        }
        index = Number(index)

        if (index < 0 || index >= sequnce.length) {
            continue;
        }

        for (let i = 0; i < sequnce.length; i++) {
            if (i === index || sequnce[i] === -1) {
                continue;
            }

            if (sequnce[i] > sequnce[index]) {
                sequnce[i] -= sequnce[index]
            } else {
                sequnce[i] += sequnce[index]
            }
        }
        sequnce[index] = -1
        shotTargets++
    }
    console.log(`Shot targets: ${shotTargets} -> ${sequnce.join(' ')}`);
}
solve(["30 30 12 60 54 66",
    "5",
    "2",
    "4",
    "0",
    "End"])

