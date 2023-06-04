function solve(input) {
    let roomsArr = input.split('|')
    let health = 100
    let btc = 0
    let dead = false

    for (let i = 0; i < roomsArr.length; i++) {

        if (dead){
            break;
        }

        let token = roomsArr[i].split(' ')
        let command = token[0]
        let num = +token[1]

        switch (command) {
            case 'potion':
                let heal = 0
                if (health < 100) {
                    if (num + health >= 100) {
                        heal = 100 - health
                        health = 100
                    } else {
                        heal = num
                        health += heal
                    }
                }
                console.log(`You healed for ${heal} hp.`);
                console.log(`Current health: ${health} hp.`);
                break;
            case 'chest':
                console.log(`You found ${num} bitcoins.`);
                btc += num
                break;
            default:
                health -= num
                if (health <= 0) {
                    console.log(`You died! Killed by ${command}.`);
                    console.log(`Best room: ${i + 1}`);
                    dead = true
                } else {
                    console.log(`You slayed ${command}.`);
                }
                break;
        }
    }
    if (!dead) {
        console.log("You've made it!");
        console.log(`Bitcoins: ${btc}`);
        console.log(`Health: ${health}`);
    }
}
solve("rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000")