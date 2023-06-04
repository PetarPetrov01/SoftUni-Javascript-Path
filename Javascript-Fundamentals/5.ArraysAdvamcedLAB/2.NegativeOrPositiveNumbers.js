function solve(arr) {
    let result = []
    for (i = 0; i < arr.length; i++){
        if (arr[i]>=0) {
            result.push(arr[i])
        } else {
            result.unshift(arr[i])
        }
    }
    console.log(result.join('\n'));
}
solve(['3', '-2', '0', '-1'])