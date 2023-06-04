function solve(input) {
    let students = Number(input.pop());
    let employeeEfficiency = input.map(Number);
    let totalEfficiency = employeeEfficiency.reduce((a, b) => a + b, 0)
    let totalHours = 0
    let currentHour = 0
    
    while (students > 0) {
        currentHour += 1
        if (currentHour == 4) {
            totalHours += 1
            currentHour = 0
            continue;
        }
        students -= totalEfficiency
        totalHours += 1
    }
    console.log(`Time needed: ${totalHours}h.`);
}
solve(['5','6','4','20'])
solve(['1','2','3','45'])
solve(['3','2','5','40'])