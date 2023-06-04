function sumOfDigits(n) {
    let number = String(n)
    let sum = 0
    for (i = 0; i < number.length; i++) {
        let digit = Number(number[i])
        sum += digit
    }
console.log(sum);
}
sumOfDigits(245678)