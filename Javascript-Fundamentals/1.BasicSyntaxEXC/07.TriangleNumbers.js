function triangle(n) {
    printLine = ''
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            printLine += `${i} `
        }
        console.log(printLine);
        printLine = ''
    }
}
triangle(3)
triangle(5)