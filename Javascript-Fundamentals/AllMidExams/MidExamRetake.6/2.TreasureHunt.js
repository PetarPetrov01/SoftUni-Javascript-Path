function solve(input) {
    let initialLoot = input.shift().split('|')

    for (el of input) {
        if (el === 'Yohoho!') {
            break;
        }
        let token = el.split(' ')
        let command = token[0]
        switch (command) {
            case 'Loot':
                for (let i = 1; i < token.length; i++) {
                    let item = token[i]
                    if (!initialLoot.includes(item)) {
                        initialLoot.unshift(item)
                    }
                }
                break;
            case "Drop":
                let index = Number(token[1])
                if (index >= 0 && index < initialLoot.length) {
                    let removedItem = initialLoot.splice(index, 1)
                    initialLoot.push(removedItem[0])
                }
                break;
            case 'Steal':
                let count = Number(token[1])
                let removedItems = []
                if (count > initialLoot.length) {
                    console.log(initialLoot.join(', '));
                    initialLoot = []
                } else {
                    for (i = 1; i <= count; i++) {
                        let currentItem = initialLoot.pop()
                        removedItems.unshift(currentItem)
                        
                    }
                    console.log(removedItems.join(', '));

                }
                break;
        }
        
    }
    let sumLength = 0
        for (el of initialLoot) {
            sumLength += el.length
        }
        let average = sumLength / initialLoot.length
        if (initialLoot.length > 0){
            console.log(`Average treasure gain: ${average.toFixed(2)} pirate credits.`);
        } else {
            console.log('Failed treasure hunt.');
        }
}
solve(["Diamonds|Silver|Shotgun|Gold",
"Loot Silver Medals Coal",
"Drop -1",
"Drop 1",
"Steal 6",
"Yohoho!"])

