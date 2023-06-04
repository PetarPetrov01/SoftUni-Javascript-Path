function classStorage() {
    class Storage {
        constructor(capacity) {
            this.capacity = capacity
            this.storage = []
        }
        get totalCost() {
            let totalCost = this.storage.reduce((acc, item) => acc + item.price*item.quantity, 0)
            return totalCost
        }
        addProduct(itemObj) {
            this.storage.push(itemObj)
            this.capacity -= itemObj.quantity
            return;
        }
        getProducts() {
            let output = []
            for (let item of this.storage) {
                
                output.push(JSON.stringify(item))
            }
            return output.join('\n');
        }
    }
    let productOne = { name: 'Cucamber', price: 1.50, quantity: 15 };
    let productTwo = { name: 'Tomato', price: 0.90, quantity: 25 };
    let productThree = { name: 'Bread', price: 1.10, quantity: 8 };
    let storage = new Storage(50);
    storage.addProduct(productOne);
    storage.addProduct(productTwo);
    storage.addProduct(productThree);
    console.log(storage.getProducts());
    console.log(storage.capacity);
    console.log(storage.totalCost);

}
classStorage()