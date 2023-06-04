function solve(arr, bomb) {
    let specialEl = bomb[0]
    let powerOfBomb = bomb[1]

    while (arr.includes(specialEl)) {

        let bombIndex = arr.indexOf(specialEl);
        let startIndex = bombIndex - powerOfBomb;
        let elementsToRemove = powerOfBomb * 2 + 1;

        if (startIndex < 0) {
            elementsToRemove += startIndex
            startIndex = 0
        }
        arr.splice(startIndex, elementsToRemove)
    }

    let sum = arr.reduce((acc, a) => acc + a, 0) //, 0 initial Value!!!!
    console.log(sum);
}
solve([1, 1, 2, 1, 1, 1, 2, 1, 1, 1],
    [2, 1]

)