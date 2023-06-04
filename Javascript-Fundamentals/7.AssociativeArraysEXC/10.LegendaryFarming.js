function farming(inputStr) {
    let legendaryItem = false
    let junkObj = {}
    let itemsObj = {
        shards: 0,
        fragments: 0,
        motes: 0

    }
    let legendItemObj = {
        shards: 'Shadowmourne',
        fragments: 'Valanyr',
        motes: 'Dragonwrath'
    }
    let inputArr = inputStr.split(' ')

    for (let i = 0; i < inputArr.length; i += 2) {
        let amount = +inputArr[i]
        let item = inputArr[i + 1].toLowerCase()
        switch (item) {
            case 'shards':
            case 'fragments':
            case 'motes':
                    amount = Number(inputArr[i]) + itemsObj[item]
                    itemsObj[item] = amount
                break;
            default:
                if (!junkObj.hasOwnProperty(item)) {
                    junkObj[item] = amount
                } else {
                    amount = Number(inputArr[i]) + junkObj[item]
                    junkObj[item] = amount
                }
                break;
        }
        if (amount >= 250 && itemsObj.hasOwnProperty(item)) {
            console.log(`${legendItemObj[item]} obtained!`);
            amount -= 250
            itemsObj[item] = amount
            legendaryItem = true
            break;
        }
    }
    Object.entries(itemsObj)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .forEach((item) => console.log(`${item[0]}: ${item[1]}`))

    Object.entries(junkObj)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .forEach((item) => console.log(`${item[0]}: ${item[1]}`))

}
farming('3 Motes 5 stones 5 Shards 6 leathers 255 fragments 7 Shards')