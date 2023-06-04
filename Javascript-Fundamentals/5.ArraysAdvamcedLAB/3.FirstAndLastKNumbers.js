function solve(arr) {
    let k = arr.shift()
    let firstKNumbers = arr.slice(0, k)
    let lastKNumbers = arr.slice(arr.length - k )
    console.log(firstKNumbers.join(' '));
    console.log(lastKNumbers.join(' '));
}
solve( [3,
    6, 7, 8, 9]   
)