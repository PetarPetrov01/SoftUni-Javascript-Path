function result(arr) {

    let isPalindrome = (number) => {
        let numberInString = number.toString()
        let reverseNumber = numberInString.split('').reverse().join('')
        return reverseNumber === numberInString ? true : false
    }
    for (num of arr) {
        console.log(isPalindrome(num));
    }
}
result([32, 2, 232, 1010])


//ALTERNATIVE SOLUTION WITHOUT NESTED FUNCTION
// function solve(arr) {

//     for (el of arr) {
//         let newArr = String(el)
//         let reverseArr = String(el).split('').reverse().join('')
//         console.log(newArr === reverseArr ? true : false)
//     }
// }
// solve([32, 2, 232, 1010])