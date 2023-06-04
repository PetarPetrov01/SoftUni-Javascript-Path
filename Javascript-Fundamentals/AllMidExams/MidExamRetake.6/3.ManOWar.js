function solve(input) {
    let ship = input.shift().split('>').map(Number)
    let warShip = input.shift().split('>').map(Number)
    let maxHealth = Number(input.shift())
    let sunk = false

    for (el of input) {
        if (el === 'Retire' || sunk) {
            break;
        }

        let commandsArr = el.split(' ')
        let command = commandsArr[0]
        let index = Number(commandsArr[1])
        let damage = 0

        switch (command) {
            case 'Fire':
                damage = Number(commandsArr[2])
                if (index >= 0 && index < warShip.length) {
                    warShip[index] -= damage
                    if (warShip[index] <= 0) {
                        console.log('You won! The enemy ship has sunken.');
                        sunk = true
                    }
                }

                break;
            case 'Defend':
                let endIndex = Number(commandsArr[2])
                damage = Number(commandsArr[3])
                if (index >= 0 && index < ship.length && endIndex > 0 && endIndex < ship.length) {
                    for (let i = index; i <= endIndex; i++) {
                        ship[i] -= damage
                        if (ship[i] <= 0) {
                            sunk = true
                            console.log('You lost! The pirate ship has sunken.');
                            break;
                        }
                    }
                }

                break;
            case 'Repair':
                let health = Number(commandsArr[2])
                if (index >= 0 && index < ship.length) {
                    ship[index] += health
                    if(ship[index]>maxHealth){
                        ship[index]=maxHealth
                    }
                }
                break;
            case 'Status':
                let filterdArr = ship.filter((num)=>num<maxHealth*0.2)
                console.log(`${filterdArr.length} sections need repair.`);
                break;
        }
    }
    if(!sunk){
        let shipStatus = ship.reduce((a,b)=>a+b,0)
        let warShipStatus = warShip.reduce((a,b)=>a+b,0)
        console.log(`Pirate ship status: ${shipStatus}`);
        console.log(`Warship status: ${warShipStatus}`);
    }
}
solve(["2>3>4>5>2",
"6>7>8>9>10>11",
"20",
"Status",
"Fire 2 3",
"Defend 0 4 11",
"Repair 3 18",
"Retire"])

