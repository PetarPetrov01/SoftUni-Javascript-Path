function solve(num) {
    let divisorsSum = 0

    let divisors = (num,currentNum) => {
        if (num % currentNum === 0) {
            divisorsSum += currentNum
        }
    }

    for (i = 1; i < num; i++) {
        divisors(num,i)
    }
    console.log((divisorsSum === num && num > 0)? 'We have a perfect number!':"It's not so perfect.")
}
solve(10)