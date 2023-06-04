/*
function max(arr) {
    let count = 0
    let printLine = ''
    for (i = 0; i <= arr.length - 1; i++) {
        if (i === arr.length - 1) {
            printLine += `${arr[i]} `
        }
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                count++
            }
            if (count === arr.length - i-1) {
                printLine += `${arr[i]} `
                count = 0
            }
        }
        count = 0
    }
    console.log(printLine);
}
max([27, 19, 42, 2, 13, 45, 48])
*/

function max2(arr){
    let result = []
    while(arr.length>0){
        let [currentNum, biggest] = [arr.shift(),Math.max(...arr)]
        if (currentNum>biggest) {
            result.push(currentNum)
        }
    }
    console.log(result.join(' '));
}
max2([41,41,34,20])