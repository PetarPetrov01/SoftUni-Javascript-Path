function solve(n, k) {
    let result = [1]
    for (i = 1; i < n; i++) {
        let startingIndex = Math.max(0,i-k)
        let element = result.slice(startingIndex,startingIndex+k)
        let elementResult = element.reduce((acc,b)=>acc+b,0)
        result.push(elementResult)
    }
    console.log(result.join(' '));
}
solve(6,3)