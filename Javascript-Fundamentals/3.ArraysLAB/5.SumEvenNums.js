/*
function sumEven(inArr) {
    let sum = 0
    for (i = 0; i <= inArr.length - 1; i++) {
        let num = Number(inArr[i])
        if (num % 2 === 0) {
            sum += num
        }
    }
    console.log(sum);
}
sumEven(['1', '2', '3', '4', '5', '6'])
*/

function sumEvenForOf(Arr) {
    let sum = 0
    for (i = 0; i <= Arr.length-1; i++){
        Arr[i] = Number(Arr[i])
    }
    for (let num of Arr){
        if (num%2===0){
            sum+=num
        }
    }
    console.log(sum);
}
sumEvenForOf(['1', '2', '3', '4', '5', '6'])