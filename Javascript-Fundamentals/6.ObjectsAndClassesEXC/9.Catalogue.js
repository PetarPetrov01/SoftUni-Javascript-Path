function catalogue(input) {
    let ObjectArr = []
    for (el of input) {
        let [product, price] = el.split(' : ')
        price = +price

        let obj = {
            product,
            price
        }
        ObjectArr.push(obj)
    }
    let sortedArr = ObjectArr.sort((a, b) => (a.product).localeCompare(b.product))

    let letter = ''
    for (let item of sortedArr) {
        
        if (item.product.charAt(0) === letter){
            console.log(`  ${item.product}: ${item.price}`);
        } else {
            letter = item.product.charAt(0)
            console.log(letter);
            console.log(`  ${item.product}: ${item.price}`);
        }
    }
}
catalogue([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
])
