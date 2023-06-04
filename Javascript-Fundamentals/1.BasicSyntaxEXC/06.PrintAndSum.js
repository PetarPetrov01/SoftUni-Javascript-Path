function printAndSum(n, m) {
    let sum = 0
    let printLine = ''
    for (let i = n; i <= m; i++) {
        printLine+=`${i} `
        sum+=i
    }
    console.log(printLine);
    console.log(`Sum: ${sum}`);
}
printAndSum(5,10)
printAndSum(0,26)