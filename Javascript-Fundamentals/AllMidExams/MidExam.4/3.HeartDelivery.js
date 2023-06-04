function delivery(input) {
    let roses = input.shift().split('@').map(Number)
    let cupidPosition = 0;

    for (el of input) {
        if (el === 'Love!') {
            break;
        }

        let commands = el.split(' ')
        let distance = +commands[1]

        cupidPosition += distance

        if (cupidPosition >= roses.length) {
            cupidPosition = 0;
        }

        if (roses[cupidPosition] === 0) {
            console.log(`Place ${cupidPosition} already had Valentine's day.`)
        } else {
            roses[cupidPosition] -= 2;
            if (roses[cupidPosition] === 0) {
                console.log(`Place ${cupidPosition} has Valentine's day.`);
            }
        }
    }

    console.log(`Cupid's last position was ${cupidPosition}.`);

    if (roses.reduce((a, b) => a + b, 0) <= 0) {
        console.log('Mission was successful.');
    } else {
        let leftHouses = roses.filter((a) => a > 0)
        console.log(`Cupid has failed ${leftHouses.length} places.`);
    }
}
delivery(["2@4@2",
    "Jump 2",
    "Jump 2",
    "Jump 8",
    "Jump 3",
    "Jump 1",
    "Love!"])


    // let succes = true
    // let count = 0

    // for (const house of roses) {
    //     if (house !== 0) {
    //         succes = false
    //         count++
    //     }
    // }


    // if (succes) {
    //     console.log('Mission was successful.');
    // } else {
    //     console.log(`Cupid has failed ${count} places.`);
    // }