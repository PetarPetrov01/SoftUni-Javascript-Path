class ChristmasDinner {
    constructor(budget) {
        if (budget < 0) {
            throw new Error("The budget cannot be a negative number")
        }
        this.budget = budget
        this.dishes = []
        this.products = []
        this.guests = {}
    }

    shopping(products) {
        let [product, price] = products
        price = Number(price)

        if (this.budget >= price) {
            this.products.push(product)
            this.budget -= price
            return `You have successfully bought ${product}!`
        } else {
            throw new Error("Not enough money to buy this product")
        }
    }

    recipes(recipe) {
        let { recipeName, productsList } = recipe

        if (!productsList.some(prod => this.products.includes(prod))) {
            throw new Error("We do not have this product")
        }
        this.dishes.push({ recipeName, productsList })
        return `${recipeName} has been successfully cooked!`
    }

    inviteGuests(name, dish) {
        if (!this.dishes.some(d => d.recipeName == dish)) {
            throw new Error("We do not have this dish")
        } else if (this.guests.hasOwnProperty(name)) {
            throw new Error("This guest has already been invited")
        } else {
            this.guests[name] = dish
            return `You have successfully invited ${name}!`
        }
    }

    showAttendance() {
        const finalArr = []

        for (let key in this.guests) {
            let name = key
            let dish = this.guests[key]
            let productIndex = this.dishes.findIndex(dishObj => dishObj.recipeName == dish)
            const products = this.dishes[productIndex].productsList

            finalArr.push(`${name} will eat ${dish}, which consists of ${products.join(', ')}`)
        }

        return finalArr.join('\n')
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

// console.log('DISHES')
// console.log(dinner.dishes)

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.guests)

console.log(dinner.showAttendance());


/*Different inviteGuest

*/

