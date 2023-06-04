function storage(inputArr) {
    let assArr = {}
    for (let products of inputArr) {
        let [product, qty] = products.split(' ')
        qty = +qty
        if (assArr.hasOwnProperty(product)) {
            assArr[product] += qty
        } else {
            assArr[product] = qty
        }
    }

    for (product in assArr) {
        console.log(`${product} -> ${assArr[product]}`);
    }
}
storage(['tomatoes 10',
    'coffee 5',
    'olives 100',
    'coffee 40']
)
//with MAP//
function mapStorage(inputArr) {
    let storage = new Map()
    for (let token of inputArr) {
        let [product, quantity] = token.split(' ')
        quantity = +quantity
        if (storage.has(product)) {
            quantity += storage.get(product)
        }
        storage.set(product, quantity)

    }
    for (let [key, value] of storage.entries()) {
        console.log(`${key} -> ${value}`);
    }
}
mapStorage(['tomatoes 10',
    'coffee 5',
    'olives 100',
    'coffee 40']
)