const { expect } = require('chai')
const dealership = require('./Dealership');

describe("Tests …", function () {
    describe("newCarCost function", function () {
        it("Returns the right price for Audi A4 B8", function () {
            expect(dealership.newCarCost('Audi A4 B8', 20000)).to.equal(5000)
        });
        'Audi A6 4K'
        it("Returns the right price for Audi A6 4K", function () {
            expect(dealership.newCarCost('Audi A6 4K', 21000)).to.equal(1000)
        });

        it("Returns the right price for 'Audi A8 D5'", function () {
            expect(dealership.newCarCost('Audi A8 D5', 26000)).to.equal(1000)
        });

        it("Returns the right price for Audi TT 8J", function () {
            expect(dealership.newCarCost('Audi TT 8J', 15000)).to.equal(1000)
        });

        it("Returns the right price for Audi TT 8J (passing string num)", function () {
            expect(dealership.newCarCost('Audi TT 8J', '15000')).to.equal(1000)
        });

        it("Returns the right price for non-existing car", function () {
            expect(dealership.newCarCost('random car', 15000)).to.equal(15000)
        });

        it("Returns the right price when passing array", function () {
            expect(dealership.newCarCost(['random car'], 15000)).to.equal(15000)
        });

        it("Returns the right price when passing number for first param", function () {
            expect(dealership.newCarCost(123, 15000)).to.equal(15000)
        });

    });

    describe("carEquipment function", function () {
        it("Passing two elements array returns the right array", function () {
            expect(dealership.carEquipment(['eq1', 'eq2'], [0, 1])).to.eql(['eq1', 'eq2'])
        });

        it("Passing one element array returns the right array", function () {
            expect(dealership.carEquipment(['eq1'], [0])).to.eql(['eq1'])
        });

        it("Passing two elements array returns the right array (only second el)", function () {
            expect(dealership.carEquipment(['eq1', 'eq2'], [1])).to.eql(['eq2'])
        });

        it("Passing three elements array ", function () {
            expect(dealership.carEquipment(['eq1', 'eq2', 'eq3'], [0, 2])).to.eql(['eq1', 'eq3'])
        });
    });

    describe("euroAcademy", function () {

        it("Passing category 4 returns the right price", function () {
            expect(dealership.euroCategory(4)).to.equal('We have added 5% discount to the final price: 14250.')
        });

        it("Passing category 5 returns the right price", function () {
            expect(dealership.euroCategory(5)).to.equal('We have added 5% discount to the final price: 14250.')
        });

        it("Passing category 3 returns the right string", function () {
            expect(dealership.euroCategory(3)).to.equal('Your euro category is low, so there is no discount from the final price!')
        });

        it("Passing category 2 returns the right string", function () {
            expect(dealership.euroCategory(2)).to.equal('Your euro category is low, so there is no discount from the final price!')
        });

        it("Passing category 1 returns the right string", function () {
            expect(dealership.euroCategory(1)).to.equal('Your euro category is low, so there is no discount from the final price!')
        });
    });

});


