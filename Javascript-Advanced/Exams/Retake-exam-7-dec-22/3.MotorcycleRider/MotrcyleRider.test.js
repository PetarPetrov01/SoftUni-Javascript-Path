const motorcycleRider = require('./MotrcyleRider.')
const { expect } = require('chai')


describe("Tests …", () => {

    describe("Test licensceRestriction", () => {
        it("Returns the right string for AM", () => {
            expect(motorcycleRider.licenseRestriction('AM')).to.equal('Mopeds with a maximum design speed of 45 km. per hour, engine volume is no more than 50 cubic centimeters, and the minimum age is 16.')
        });

        it("Returns the right string for A1", () => {
            expect(motorcycleRider.licenseRestriction('A1')).to.equal("Motorcycles with engine volume is no more than 125 cubic centimeters, maximum power of 11KW. and the minimum age is 16.")
        });

        it("Returns the right string for A2", () => {
            expect(motorcycleRider.licenseRestriction('A2')).to.equal("Motorcycles with maximum power of 35KW. and the minimum age is 18.")
        });

        it("Returns the right string for A", () => {
            expect(motorcycleRider.licenseRestriction('A')).to.equal("No motorcycle restrictions, and the minimum age is 24.")
        });

        //Non valid string
        it("Throws invalid information for any other case", () => {
            expect(() => motorcycleRider.licenseRestriction('AA')).to.throw("Invalid Information!")
        });
    });

    describe("Test motorcycleShowroom", () => {
        it("Returns the right asnwer", () => {
            expect(motorcycleRider.motorcycleShowroom([100,200],300)).to.equal("There are 2 available motorcycles matching your criteria!")
        });


        it("Throws invalid information for any other case (string)", () => {
            expect(() => motorcycleRider.motorcycleShowroom('a','a')).to.throw("Invalid Information!")
        });

        it("Throws invalid information for invalid input (empty array, number less than 50)", () => {
            expect(() => motorcycleRider.motorcycleShowroom([],30)).to.throw("Invalid Information!")
        });
    });

    describe("otherSpendings ", () => {
        it("Returns the right anwer (270.00) for helmet,engine oil and filter", () => {
            expect(motorcycleRider.otherSpendings(['helmet'],['engine oil','oil filter'],true)).to.equal('You spend $270.00 for equipment and consumables with 10% discount!')
        });

        it("Returns the right anwer (270.00) wihtout discount", () => {
            expect(motorcycleRider.otherSpendings(['helmet'],['engine oil'],false)).to.equal('You spend $270.00 for equipment and consumables!')
        });

        it("Returns the right float pointing number", () => {
            expect(motorcycleRider.otherSpendings([],['engine oil'],true)).to.equal('You spend $63.00 for equipment and consumables with 10% discount!')
        });

        it("Returns the right answer(all items plus discount)", () => {
            expect(motorcycleRider.otherSpendings(['helmet','jacked'],['engine oil','oil filter'],true)).to.equal('You spend $540.00 for equipment and consumables with 10% discount!')
        });

        it("Returns the right answer (same item mulitple times)", () => {
            expect(motorcycleRider.otherSpendings(['helmet','helmet'],[],true)).to.equal('You spend $360.00 for equipment and consumables with 10% discount!')
        });

        it("Throws invalid information for invalid input", () => {
            expect(() => motorcycleRider.otherSpendings(1,1,'a')).to.throw("Invalid Information!")
        });
    });

});

