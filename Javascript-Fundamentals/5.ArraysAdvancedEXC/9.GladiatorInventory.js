function solve(inArr) {
    let inventory = inArr.shift().split(' ')
    for (el of inArr) {
        let fullCommand = el.split(' ')
        let currentCommand = fullCommand[0]
        let equipment = fullCommand[1]
        switch (currentCommand) {

            case "Buy":
                if (!inventory.includes(equipment)) {
                    inventory.push(equipment)
                }
                break;

            case "Trash":
                if (inventory.includes(equipment)) {
                    inventory.splice(inventory.indexOf(equipment), 1)
                }
                break;

            case "Repair":
                if (inventory.includes(equipment)) {
                    let repairedItem = inventory.splice(inventory.indexOf(equipment), 1).join()
                    inventory.push(repairedItem)
                }
                break;

            case "Upgrade":
                let itemUpgrade = equipment.split('-')
                let item = itemUpgrade[0]
                let upgrade = itemUpgrade[1]

                if (inventory.includes(item)) {
                    let upgraded = item + ":" + upgrade
                    inventory.splice(inventory.indexOf(item) + 1, 0, upgraded)
                }
                break;
        }
    }
    console.log(inventory.join(' '));
}
solve(['SWORD Shield Spear',
'Trash Bow',
'Repair Shield',
'Upgrade Helmet-V']

)