function solve(string) {
    let arr = string.split(' ').map(Number)
    let average = arr.reduce((acc, el) => acc + el, 0) / arr.length

    let sortedArr = arr.filter(a => a > average).sort((a, b) => b - a)

    if (sortedArr.length <= 0) {
        console.log(`No`);
    } else {
        console.log(sortedArr.slice(0, 5).join(' '));
    }
}
solve('10 20 30 40 50')
solve('1')
solve('-1 -2 -3 -4 -5 -6')