function solve(arr) {
    let result = []
    for (el of arr) {
        if (result.indexOf(el) < 0){
            result.push(el)
        }
    }
    console.log(result.join(' '));
}
solve([20, 8, 12, 13, 4, 4, 8, 5])