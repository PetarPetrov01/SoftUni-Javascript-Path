function solve(input) {
    let customer = input.pop()
    let pricesArr = input.map(Number)
    let sumNoTaxes = 0
    let taxes = 0
    let sum = 0

    for (part of pricesArr) {
        if (part > 0) {
            sumNoTaxes += part
        } else {
            console.log(`Invalid price!`);
        }
    }
    if (sumNoTaxes > 0) {
        taxes = sumNoTaxes * 0.2
        switch (customer) {
            case 'special':
                sum = (sumNoTaxes + taxes) * 0.9
                break;
            case 'regular':
                sum = (sumNoTaxes + taxes)
                break;
        }
        console.log(`Congratulations you've just bought a new computer!`);
        console.log(`Price without taxes: ${sumNoTaxes.toFixed(2)}$`);
        console.log(`Taxes: ${taxes.toFixed(2)}$`);
        console.log(`-----------`);
        console.log(`Total price: ${sum.toFixed(2)}$`);
    } else {
        console.log(`Invalid order!`);
    }
}
solve([
    '1023', 
    '15', 
    '-20',
    '-5.50',
    '450', 
    '20', 
    '17.66', 
    '19.30', 'regular'
    ])
    
    
