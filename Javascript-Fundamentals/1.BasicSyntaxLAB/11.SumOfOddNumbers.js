function solve(n) {
    let numPrint = 1
    let sum = 0
    for (let i = 1; i <= n; i++){
        console.log(numPrint);
        sum+=numPrint
        numPrint+=2
    }
    console.log(`Sum: ${sum}`);
}
solve(9)