function solve(input) {
    let sequnce = input.shift().toString().split(' ')
    let moves = 0
    let win = false

    for (command of input) {
        
        if (command === 'end') {
            break;
        }
        command = command.split(' ').map(Number)
        moves++
        if (command[0] === command[1] || command[0] >= sequnce.length || command[1] >= sequnce.length || command[0] < 0 || command[1] < 0) {
            console.log('Invalid input! Adding additional elements to the board')
            let middleIndex = sequnce.length / 2
            let elementToAdd = `-${moves}a`
            sequnce.splice(middleIndex, 0, elementToAdd, elementToAdd)

        } else if (sequnce[command[0]] === sequnce[command[1]]) {
            console.log(`Congrats! You have found matching elements - ${sequnce[command[0]]}!`);
            if (command[0] > command[1]) {
                sequnce.splice(command[0], 1)
                sequnce.splice(command[1], 1)
            } else {
                sequnce.splice(command[1], 1)
                sequnce.splice(command[0], 1)
            }
        } else {
            console.log(`Try again!`);
        }

        if (sequnce.length <= 0) {
            win = true
            break;
        }
    }
    if (win) {
        console.log(`You have won in ${moves} turns!`);
    } else {
        console.log(`Sorry you lose :( \n ${sequnce.join(' ')}`);
    }
}
solve([
    "a 2 4 a 2 4", 
    "4 0", 
    "0 2",
    "0 1",
    "0 1", 
    "end"
    ])