function sort(arr) {
    let bigToSmallArr = arr.slice().sort((a, b) => b - a)
    let samllToBigArr = arr.slice().sort((a, b) => a - b)
    let arrHalf = arr.length / 2
    let result = []
    for (i = 0; i < arrHalf; i++) {
        result.push(bigToSmallArr[i])
        if (result.length !== arr.length) {
            result.push(samllToBigArr[i])
        }
    }
    console.log(result.join(' '));
}

sort([1, 21, 3, 52, 69, 63, 31, 2, 18, 232])


function solve(arr) {
    let sortedArr = arr.sort((a, b) => a - b)
    let resultArr = []
    while (sortedArr.length !== 0){

        let biggestNum = sortedArr.pop()
        let smallestNum = sortedArr.shift()
        
        resultArr.push(biggestNum)
        resultArr.push(smallestNum)
    }
    console.log(resultArr.join(' '));
}
solve([1, 21, 3, 52, 69, 63, 31, 2, 18, 232])