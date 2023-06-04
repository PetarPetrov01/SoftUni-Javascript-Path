function solve(inputArr, commands) {
    let endIndex = Number(commands[0])
    let deleteCount = Number(commands[1])
    let searchNumber = Number(commands[2])
    let count = 0

    let arr = inputArr.slice(0, endIndex)
    arr.splice(0, deleteCount)

    
    for (num of arr) {
        if (num === searchNumber) {
            count++
        }
    }
    console.log(`Number ${searchNumber} occurs ${count} times.`);
}
solve([5, 2, 3, 4, 1, 6],
    [5, 2, 3]
)