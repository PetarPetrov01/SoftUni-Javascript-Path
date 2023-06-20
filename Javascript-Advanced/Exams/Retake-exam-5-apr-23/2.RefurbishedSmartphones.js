class RefurbishedSmartphones {
    constructor(retailer) {
        this.retailer = retailer
        this.availableSmartphones = []
        this.soldSmartphones = []
        this.revenue = 0
    }

    addSmartphone(model, storage, price, condition) {
        if (model == '' || storage < 0 || price < 0 || condition == '') {
            throw new Error("Invalid smartphone!")
        }
        this.availableSmartphones.push({ model, storage: storage, price, condition: condition })
        return `New smartphone added: ${model} / ${storage} GB / ${condition} condition - ${price.toFixed(2)}$`
    }

    sellSmartphone(model, desiredStorage) {
        let soldPrice = 0
        let currentPhone = this.availableSmartphones.find(phone => phone.model == model)

        if (!currentPhone) {
            throw new Error(`${model} was not found!`)
        }

        if (currentPhone.storage >= desiredStorage) {
            soldPrice = currentPhone.price
        } else if (Math.abs(currentPhone.storage - desiredStorage) <= 128) {
            soldPrice = currentPhone.price - (currentPhone.price * 0.1)
        } else {
            soldPrice = currentPhone.price - (currentPhone.price * 0.2)
        }

        this.soldSmartphones.push({ model: currentPhone.model, storage: currentPhone.storage, soldPrice })
        this.availableSmartphones.filter(ph => ph.model != model)
        this.revenue += soldPrice

        return `${model} was sold for ${soldPrice.toFixed(2)}$`
    }

    upgradePhones() {
        if (this.availableSmartphones.length == 0) {
            throw new Error('There are no available smartphones!') 
        }
        let output = ["Upgraded Smartphones:"]
        this.availableSmartphones.map(phone => {
            const newStorage = phone.storage*2
            const roundedPrice = phone.price.toFixed(2)
            return {
                ...phone,
                storage: newStorage,
                price: roundedPrice
            }
        })
            .forEach(phone => output.push(`${phone.model} / ${phone.storage} GB / ${phone.condition} condition / ${phone.price}$`))

        return output.join('\n')
    }

    salesJournal(criteria) {
        if (criteria != 'storage' && criteria != 'model') {
            throw new Error("Invalid criteria!")
        }

        if (criteria == 'storage') {
            this.soldSmartphones.sort((phA, phB) => phB.storage - phA.storage)
        } else if (criteria == 'model') {
            this.soldSmartphones.sort((phA, phB) => phA.model.localeCompare(phB.model))
        }

        let output = [`${this.retailer} has a total income of ${this.revenue.toFixed(2)}$`,
        `${this.soldSmartphones.length} smartphones sold:`]

        this.soldSmartphones.forEach(ph => output.push(`${ph.model} / ${ph.storage} GB / ${(ph.soldPrice).toFixed(2)}$`))

        return output.join('\n')
    }
}

let retailer = new RefurbishedSmartphones('SecondLife Devices');
retailer.addSmartphone('Samsung S20 Ultra', 256, 1000, 'good');
retailer.addSmartphone('Iphone 12 mini', 128, 800, 'perfect');
retailer.addSmartphone('Xiaomi Redmi Note 10 Pro', 128, 330, 'perfect');
retailer.sellSmartphone('Samsung S20 Ultra', 256);
retailer.sellSmartphone('Xiaomi Redmi Note 10 Pro', 256);
console.log(retailer.salesJournal('model'));



