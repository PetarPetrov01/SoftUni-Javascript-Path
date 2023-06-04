function solve(arr) {
    let newArr = []
    for (i = 0; i < arr.length; i++) {
        if (i % 2 !== 0) {
            newArr.push(arr[i]*2)
        }
    }
console.log(newArr.reverse().join(' '));
}
solve([3, 0, 10, 4, 7, 3])