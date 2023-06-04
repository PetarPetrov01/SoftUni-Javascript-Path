function gladiatorExpenses(lostFights,helmetPrice,swordPrice,shieldPrice,armorPrice){
let helmetRepair = Math.trunc(lostFights/2)*helmetPrice
let swordRepair = Math.trunc(lostFights/3)*swordPrice
let shieldRepair = Math.trunc(lostFights/6)*shieldPrice
let armorRepair = Math.trunc(lostFights/12)*armorPrice
let sum = helmetRepair+swordRepair+shieldRepair+armorRepair
console.log(`Gladiator expenses: ${sum.toFixed(2)} aureus`);
}
gladiatorExpenses(23,
    12.50,
    21.50,
    40,
    200
    
    )