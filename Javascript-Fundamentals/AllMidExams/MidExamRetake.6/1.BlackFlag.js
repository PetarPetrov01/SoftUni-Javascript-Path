function solve(input) {
    let arr = input.map(Number)
    let totalPlunder = 0

    for (let i = 1; i <= arr[0]; i++) {
        totalPlunder += arr[1]
        if (i % 3 == 0) {
            totalPlunder += 0.5 * arr[1]
        }
        if (i % 5 == 0) {
            totalPlunder *= 0.7
        }
    }

    let percentage = totalPlunder/(arr[2]/100)
    if (totalPlunder >= arr[2]){
        console.log(`Ahoy! ${totalPlunder.toFixed(2)} plunder gained.`);
    } else {
        console.log(`Collected only ${percentage.toFixed(2)}% of the plunder.`);
    }
        
}
solve((["10",
"20",
"380"])
)
