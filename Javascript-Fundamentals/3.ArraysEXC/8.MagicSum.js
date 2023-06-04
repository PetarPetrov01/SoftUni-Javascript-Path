/*function magicSum(arr, magicNum) {
    let newArr = []
    for (k = 0; k < arr.length; k++) {
        newArr.push(arr[k])
    }
    for (i = 0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (newArr[0] + arr[j] === magicNum) {
                console.log(`${newArr[0]} ${arr[j]}`);
            }
        }
        newArr.shift()
    }
}
magicSum([1, 7, 6, 2, 19, 23],
    8
)
*/
function magSum(arr,magicNum) {
    for (i = 0; i < arr.length; i++) {
        for (j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === magicNum) {
                console.log(`${arr[i]} ${arr[j]}`);
            }
        }
    }
}
magSum([1, 7, 6, 2, 19, 23],8)