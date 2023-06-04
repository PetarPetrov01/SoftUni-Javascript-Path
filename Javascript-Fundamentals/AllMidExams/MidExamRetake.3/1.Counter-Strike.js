function solve(input) {
    let initialEnergy = Number(input.shift())
    let wins = 0
    let win = true

    for (el of input) {
        if (el === 'End of battle') {
            break;
        }

        distance = Number(el)
        if (distance > initialEnergy) {
            console.log(`Not enough energy! Game ends with ${wins} won battles and ${initialEnergy} energy`);
            win = false
            break;
        }

        initialEnergy -= distance
        wins++
        if (wins % 3 == 0) {
            initialEnergy += wins
        } 
    }
    if (initialEnergy>=0 && win){
        console.log(`Won battles: ${wins}. Energy left: ${initialEnergy}`);
    }
}
solve(["200",
"54",
"14",
"28",
"13",
"End of battle"])



