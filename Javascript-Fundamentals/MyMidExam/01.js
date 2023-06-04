function calculate(input) {
    let budget = Number(input[0])
    let student = Number(input[1])


    let freePackages = Math.floor(student / 5)
    let eggPrice = Number(input[3]) * student * 10
    let apronPrice = Number(input[4]) * Math.ceil(student * 1.2)
    let flourPrice = Number(input[2]) * (student - freePackages)

    let sum = eggPrice + apronPrice + flourPrice
    if(sum<=budget){
        console.log(`Items purchased for ${sum.toFixed(2)}$.`);
    } else{
        console.log(`${(sum-budget).toFixed(2)}$ more needed.`);
    }
}
calculate([50,
    2,
    1.0,
    0.10,
    10.0])
    
    
    
    
