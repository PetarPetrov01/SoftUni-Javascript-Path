function trackCofee(input) {
    let coffeeInStock = input.shift().split(' ')
    let n = Number(input.shift())

    let reversedArr = []

    for (i = 0; i < n; i++) {
        let commandArr = input[i].split(' ')
        let command = commandArr[0]

        switch (command) {
            case 'Include':
                coffeeInStock.push(commandArr[1])
                break;
            case 'Remove':
                let removeCount = Number(commandArr[2])
                if (removeCount <= coffeeInStock.length) {
                    if (commandArr[1] === 'first') {
                        coffeeInStock.splice(0, removeCount)
                    } else if (commandArr[1] === 'last') {
                        coffeeInStock.splice(coffeeInStock.length - removeCount, removeCount)
                    }
                }
                break;
            case 'Prefer':
                let firstIndex = Number(commandArr[1])
                let secondIndex = Number(commandArr[2])
                let firstCoffee = ''
                let secondCoffee = ''
                if (firstIndex >= 0 && secondIndex >= 0 && firstIndex < coffeeInStock.length && secondIndex < coffeeInStock.length) {
                    if (firstIndex >= secondIndex) {
                        firstCoffee = coffeeInStock.splice(firstIndex, 1).join()
                        secondCoffee = coffeeInStock.splice(secondIndex, 1).join()
                        coffeeInStock.splice(secondIndex, 0, firstCoffee)
                        coffeeInStock.splice(firstIndex, 0, secondCoffee)
                    } else {
                        secondCoffee = coffeeInStock.splice(secondIndex, 1).join()
                        firstCoffee = coffeeInStock.splice(firstIndex, 1).join()
                        coffeeInStock.splice(firstIndex, 0, secondCoffee)
                        coffeeInStock.splice(secondIndex, 0, firstCoffee)
                    }
                }
                break;
            case 'Reverse':

                for (i = 0; i < coffeeInStock.length; i++) {
                    reversedArr.unshift(coffeeInStock[i])
                }
                coffeeInStock = reversedArr
                break;
        }
    }
    console.log('Coffees:');
    console.log(coffeeInStock.join(' '));
}
trackCofee(["Robusta StrongCoffee BulkCoffee TurkishCoffee Arabica",
    "3",
    "Include OrdinaryCoffee",
    "Remove first 1",
    "Prefer 4 1"])


