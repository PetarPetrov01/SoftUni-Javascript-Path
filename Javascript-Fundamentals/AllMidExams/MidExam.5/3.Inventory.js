function solve(input) {
    let items = input.shift().split(', ')

    for (el of input) {
        if (el === 'Craft!') {
            break;
        }

        let token = el.split(' - ')
        let command = token[0]
        let item = token[1]

        switch (command) {
            case 'Collect':
                if (!items.includes(item)) {
                    items.push(item)
                }
                break;
            case 'Drop':
                if (items.includes(item)) {
                    items.splice(items.indexOf(item), 1)
                }
                break;
            case 'Combine Items':
                let itemToken = item.split(':')
                let oldItem = itemToken[0]
                let newItem = itemToken[1]
                if (items.includes(oldItem)) {
                    let oldIndex = items.indexOf(oldItem)
                    items.splice(oldIndex + 1, 0, newItem)
                }
                break;
            case 'Renew':
                if (items.includes(item)) {
                    items.splice(items.indexOf(item), 1)
                    items.push(item)
                }
                break;

        }
        
    }
    console.log(items.join(', '));
}
solve([
    'Iron, Sword',
    'Drop - Bronze',
    'Combine Items - Sword:Bow',
    'Renew - Iron',
    'Craft!'
]
)