function solve(num) {
    let printNum = 0
    if (num % 10 == 0) {
        printNum = 10
    } else if (num % 7 == 0) {
        printNum = 7
    } else if (num % 6 == 0) {
        printNum = 6
    } else if (num % 3 == 0) {
        printNum = 3
    } else if (num % 2 == 0) {
        printNum = 2
    }

    if (printNum > 1) {
        console.log(`The number is divisible by ${printNum}`);
    } else {
        console.log(`Not divisible`);
    }
}
solve(30)
solve(15)
solve(12)
solve(1643)