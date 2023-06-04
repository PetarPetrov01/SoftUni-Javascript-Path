function worldTour(input) {
    let destinations = input.shift()
    let commands = input.shift()
    while (commands !== 'Travel') {
        let commandsArr = commands.split(":")
        let command = commandsArr[0]
        let index = 0
        switch (command) {
            case 'Add Stop':
                index = +commandsArr[1]
                let currentDestination = commandsArr[2]
                if (index >= 0 && index < destinations.length) {
                    destinations = destinations.slice(0, index) + currentDestination + destinations.slice(index, destinations.length)
                }
                break;
            case 'Remove Stop':
                index = +commandsArr[1]
                let secondIndex = + commandsArr[2]
                if (index >= 0 && secondIndex >= index && index < destinations.length && secondIndex < destinations.length) {
                    destinations = destinations.slice(0, index) + destinations.slice(secondIndex + 1, destinations.length)
                }
                break;
            case 'Switch':
                let oldDest = commandsArr[1]
                let newDest =  commandsArr[2]
                destinations = destinations.replace(oldDest,newDest)
                break;
        }

        console.log(destinations);
        commands = input.shift()
    }
    console.log(`Ready for world tour! Planned stops: ${destinations}`);
}
worldTour(["Albania:Bulgaria:Cyprus:Deuchland",
"Add Stop:3:Nigeria",
"Remove Stop:4:8",
"Switch:Albania: Azərbaycan",
"Travel"])

