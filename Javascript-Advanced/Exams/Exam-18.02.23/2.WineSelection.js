class WineSelection {
    constructor(space) {
        this.space = space
        this.wines = []
        this.bill = 0
    }

    reserveABottle(wineName, wineType, price) {

        if (this.space <= 0) {
            throw new Error("Not enough space in the cellar.")
        }

        this.space--

        this.wines.push({ wineName, wineType, price, paid: false })
        return `You reserved a bottle of ${wineName} ${wineType} wine.`
    }

    payWineBottle(wineName, price) {
        let currentWine = this.wines.find(wine => wine.wineName == wineName)

        if (!currentWine) {
            throw new Error(`${wineName} is not in the cellar.`)
        }

        if (currentWine.paid) {
            throw new Error(`${wineName} has already been paid.`)
        }

        currentWine.paid = true
        this.bill += currentWine.price
        return `You bought a ${wineName} for a ${price}$.`
    }

    openBottle(wineName) {
        let currentWine = this.wines.find(wine => wine.wineName == wineName)

        if (!currentWine) {
            throw new Error("The wine, you're looking for, is not found.")
        }

        if (currentWine.paid == false) {
            throw new Error(`${wineName} need to be paid before open the bottle.`)
        }

        let currentWineIndex = this.wines.indexOf(currentWine)
        this.wines.splice(currentWine, 1)

        return `You drank a bottle of ${wineName}.`
    }

    cellarRevision(wineType) {
        let output = []
        if (!wineType) {
            output.push(`You have space for ${this.space} bottles more.`)
            output.push(`You paid ${this.bill}$ for the wine.`)

            this.wines
                .sort((aObj, bObj) => aObj.wineName.localeCompare(bObj.wineName))
                .forEach(wine => output.push(`${wine.wineName} > ${wine.wineType} - ${wine.paid ? 'Has Paid' : 'Not Paid'}.`))

            return output.join('\n')
        }

        //Passing param
        let currentWine = this.wines.find(wine => wine.wineType == wineType)
        if (!currentWine) {
            throw new Error(`There is no ${wineType} in the cellar.`)
        }

        return `${currentWine.wineName} > ${currentWine.wineType} - ${currentWine.paid ? 'Has Paid' : 'Not Paid'}.`
    }
}


const selection = new WineSelection(5)
selection.reserveABottle('Bodegas Godelia Mencía', 'Rose', 144);
selection.payWineBottle('Bodegas Godelia Mencía', 144);
selection.reserveABottle('Sauvignon Blanc Marlborough', 'White', 50);
selection.reserveABottle('Cabernet Sauvignon Napa Valley', 'Red', 120);
console.log(selection.cellarRevision());




