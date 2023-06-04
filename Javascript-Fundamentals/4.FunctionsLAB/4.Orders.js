function order(product, num) {
    let totalPrice = 0
    switch (product) {
        case 'coffee':
            totalPrice = num * 1.50
            break;
        case 'water':
            totalPrice = num * 1
            break;
        case 'coke':
            totalPrice = num * 1.40
            break;
        case 'snacks':
            totalPrice = num * 2
            break;
    }
    return totalPrice.toFixed(2)
}
console.log(order("water", 5))