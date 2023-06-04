function solve(input) {
    let people = Number(input.shift())
    let lift = input.toString().split(' ').map(Number)

    for (i = 0; i < lift.length; i++) {
        let emptyWagonSpace = lift[i]

        if (emptyWagonSpace < 4 && people > 0) {
            if (people >= 4 - lift[i]) {
                people -= 4 - lift[i]
                lift[i] = 4
            } else {
                lift[i] += people
                people = 0
            }
        }
    }

    if (people > 0) {
        console.log(`There isn't enough space! ${people} people in a queue!`);
    } else if (lift[lift.length - 1] !== 4) {
        console.log(`The lift has empty spots!`);
    }
    console.log(lift.join(' '));
}

solve([
    "15",
    "0 0 0 0"
]

)
   // let endLift = lift.map(wagon => {

    //     if (wagon < 4 && people >0) {
    //         let peopleGettingOn = 4 - wagon
    //         people -= peopleGettingOn
    //         wagon += peopleGettingOn
    //         return wagon
    //     } else {
    //         return 1
    //     }
    // })
