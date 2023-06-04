// function solve(str) {
//     str = String(str)
//     let oddSum = 0
//     let evenSum = 0
//     for (i = 0; i < str.length; i++) {
//         let char = Number(str[i])
//         if (char % 2 == 0) {
//             evenSum += char
//         } else {
//             oddSum += char
//         }
//     }
//     console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
// }

function result(input) {

    let inputString = input.toString()
    let inputLength = inputString.length

    let evenSum = () => {

        let evenSum = 0
        for (let i = 0; i < inputLength; i++) {
            let number = Number(inputString[i])
            if (number % 2 === 0) {
                evenSum += number
            }
        }
        return evenSum;
    }

    let oddSum = () => {

        let oddSum = 0
        for (let i = 0; i < inputLength; i++) {
            let number = Number(inputString[i])
            if (number % 2 !== 0) {
                oddSum += number
            }
        }
        return oddSum;
    }
    console.log(`Odd sum = ${oddSum(input)}, Even sum = ${evenSum(input)}`);
}
result(3495892137259234)