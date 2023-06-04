function solve(arr) {
    let result = arr.slice()
    arr.sort((a, b) => a-b)
    result = arr.slice(0,2)
    console.log(result.join(' '));
}
solve([3, 0, 10, 4, 7, 3])