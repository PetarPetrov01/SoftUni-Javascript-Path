//WORKING ON JUDGE
function fact(a, b) {

    return (factor(a) / factor(b)).toFixed(2)

    function factor(num) {
        return num === 0 ? 1 : (num * factor(num - 1))
    }
}
console.log(fact(6, 2))

//ALTERNATIVE WORKING ON JUDGE
function result(a, b) {

    return (factorialOfNum(a) / factorialOfNum(b)).toFixed(2)

    function factorialOfNum(num) {
        let factorial = 1
        for (i = 1; i <= num; i++) {
            factorial *= i
        }
        return factorial
    }
}
console.log(result(6, 2));

//ALTERNATIVE THAT USED TO WORK ON JUDGE????
function factorial(n, z) {
    if (n > 1) {
        return (n * factorial(n - 1, z)).toFixed(2)
    } else {
        return (1 / z).toFixed(2)
    }
}
console.log(factorial(6, 2))
