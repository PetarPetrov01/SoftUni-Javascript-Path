// function charactersInRange(firstChar, secondChar) {
//     let printLine = ''
//     let firstInAscii = String(firstChar).charCodeAt(0)
//     let secondInAscii = String(secondChar).charCodeAt(0)
//     if (firstInAscii > secondInAscii) {
//         for (i = secondInAscii + 1; i < firstInAscii; i++) {
//             printLine += `${String.fromCharCode(i)} `
//         }
//     } else {
//         for (i = firstInAscii + 1; i < secondInAscii; i++) {
//             printLine += `${String.fromCharCode(i)} `
//         }
//     }
//     console.log(printLine);
// }

function result(a, b) {
    let printArr = []
    let numOne = Number(a.charCodeAt(0))
    let numTwo = Number(b.charCodeAt(0))

    let smallestNum = Math.min(numOne, numTwo)
    let biggestNum = Math.max(numOne, numTwo)

    let toSymbol = () => {
        for (let i = smallestNum + 1; i < biggestNum; i++) {
            let symbol = String.fromCharCode(i)
            printArr.push(symbol)
        }
        return printArr.join(' ');
    }
    console.log(toSymbol(smallestNum, biggestNum));
}
result('#',
    ':'
)