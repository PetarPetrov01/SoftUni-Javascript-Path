function solve(input) {
    let bestRoom = 0
    let health = 100
    let coins = 0
    let arr = input[0].split("|")
    let death = false
    for (i = 0; i < arr.length; i++) {
        // console.log(arr[i]);
        bestRoom++
        let rooms = arr[i].split(" ")
        switch (rooms[0]) {
            case 'potion':
                
                if (health + Number(rooms[1]) >= 100) {
                    console.log(`You healed for ${100-health} hp.`);
                    health = 100
                    console.log(`Current health: ${health} hp.`);
                } else {
                    health += Number(rooms[1])
                    console.log(`You healed for ${rooms[1]} hp.`);
                    console.log(`Current health: ${health} hp.`);
                }
                break;
            case 'chest':
                coins += Number(rooms[1])
                console.log(`You found ${rooms[1]} coins.`);
                break;
            default:
                health -= Number(rooms[1])
                if (health <= 0) {
                    death = true
                    console.log(`You died! Killed by ${rooms[0]}.`);
                    console.log(`Best room: ${bestRoom}`);
                    break;
                } else {
                    console.log(`You slayed ${rooms[0]}.`);
                }
        }
        if (death) {
            break;
        }
    }
    if (i === arr.length) {
        console.log(`You've made it!`);
        console.log(`Coins: ${coins}`);
        console.log(`Health: ${health}`);
    }
}
solve(["cat 10|potion 30|orc 10|chest 10|snake 25|chest 110"])