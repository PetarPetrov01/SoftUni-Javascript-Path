function solve(arr) {
    let result = arr.slice()
    result.sort()
    for (i = 0; i < result.length; i++){
        console.log(`${i+1}.${result[i]}`);
    }
}
solve(['Potatoes', 'Tomatoes', 'Onions', 'Apples'])