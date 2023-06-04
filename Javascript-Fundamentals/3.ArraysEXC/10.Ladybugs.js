function ladyBugs(inArr) {
    let currentArray = inArr.slice();
    let fieldSize = currentArray.shift();
    let initialIndexes = currentArray.shift().split(" ");
    let finalIndexes = new Array(fieldSize).fill(0);

    for (let position of initialIndexes) {
        let currentBug = Number(position)
        if (currentBug < 0 || currentBug >= fieldSize) {
            continue;
        }
        finalIndexes[currentBug] = 1
    }

    for (let i = 0; i < currentArray.length; i++) {
        let [indexAt, direction, distance] = currentArray[i].split(" ");
        indexAt = Number(indexAt)
        if (indexAt < 0 || indexAt >= finalIndexes.length || finalIndexes[indexAt] !== 1) {
            continue;
        }
        finalIndexes[indexAt] = 0
        distance = Number(distance)
        if (direction === 'left') {
            distance = -distance
        }
        indexAt += distance
        while (indexAt >= 0 && indexAt < finalIndexes.length){
            if (finalIndexes[indexAt]===0){
                finalIndexes[indexAt] = 1
                break;
            }
            indexAt +=distance 
        }
    }
    console.log(finalIndexes.join(" "));
}
ladyBugs([ 5, '3',
'3 left 2',
'1 left -2']
)