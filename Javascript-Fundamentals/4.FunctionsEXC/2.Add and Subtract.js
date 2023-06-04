// function solve(x, y, z) {
//     function subtract(sum, z) {
//         console.log(sum - z);
//     }
//     subtract(x + y, z)
// }
// solve(23, 6, 10)

function result(fNum, sNum, tNum) {
    let sum = (firstNum, secondNum) => {
        return firstNum + secondNum
    }
    return sum(fNum,sNum) - tNum;
}
console.log(result(23,6,10))