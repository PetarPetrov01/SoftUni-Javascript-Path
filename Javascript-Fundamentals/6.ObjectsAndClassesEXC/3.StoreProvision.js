function countItems(stockItems, orderedItems) {
    let items = {}
    for (i = 0; i < stockItems.length; i += 2) {
        let currentItem = stockItems[i]
        let currentQuantity = +stockItems[i + 1]
        items[currentItem] = currentQuantity
    }

    for (i = 0; i < orderedItems.length; i += 2) {
        let orderedItem = orderedItems[i]
        let orderedQty = +orderedItems[i + 1]

        if (!items.hasOwnProperty(orderedItem)) {
            items[orderedItem] = 0
        }
        items[orderedItem] += orderedQty

    }
    for (item in items) {
        console.log(`${item} -> ${items[item]}`);
    }
}

countItems([
    'Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'
],
    [
        'Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'
    ]
)    