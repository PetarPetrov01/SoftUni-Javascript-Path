const { expect } = require('chai')
const findNewApartment = require('./findApartment')

describe("Tests …", function () {
  describe("isGoodLocation method functionality", function () {

    it("Returns the right message fot city input other than Sofia, Plvodiv or Varna", function () {
      expect(findNewApartment.isGoodLocation('Vratsa', true)).to.equal("This location is not suitable for you.")
    });

    it("Returns the right message for suitable city and false nearPublicTransport", function () {
      expect(findNewApartment.isGoodLocation('Plovdiv', false)).to.equal("There is no public transport in area.")
    });

    it("Returns the right message for happy case", function () {
      expect(findNewApartment.isGoodLocation('Plovdiv', true)).to.equal("You can go on home tour!")
    });

    //input validation
    it("Throws error for single parameter", function () {
      expect(() => findNewApartment.isGoodLocation('Vratsa')).to.throw("Invalid input!")
    });

    it("Throws error for number as first parameter", function () {
      expect(() => findNewApartment.isGoodLocation(4, true)).to.throw("Invalid input!")
    });

    it("Throws error for array as first parameter", function () {
      expect(() => findNewApartment.isGoodLocation(['Sofiq'], true)).to.throw("Invalid input!")
    });

    it("Throws error for string as second param", function () {
      expect(() => findNewApartment.isGoodLocation('Sofia', 'true')).to.throw("Invalid input!")
    });

    it("Throws error for both params not mathing the needed type", function () {
      expect(() => findNewApartment.isGoodLocation(['Sofia'], 'true')).to.throw("Invalid input!")
    });

  });


  describe("isLargeEnough method functionality", function () {

    it("Stores the right values", function () {
      expect(findNewApartment.isLargeEnough([10, 20, 30], 5)).to.equal('10, 20, 30')
    });

    it("Stores the right values (containing number less than minimum)", function () {
      expect(findNewApartment.isLargeEnough([10, 3, 30], 5)).to.equal('10, 30')
    });

    it("Stores the right values (containing number equal to minimum)", function () {
      expect(findNewApartment.isLargeEnough([10, 5, 30], 5)).to.equal('10, 5, 30')
    });

    //input validation
    it("Throws error if first param is not array", function () {
      expect(() => findNewApartment.isGoodLocation(10, 10)).to.throw("Invalid input!")
    });

    it("Throws error if first param is an empty array", function () {
      expect(() => findNewApartment.isGoodLocation([], 10)).to.throw("Invalid input!")
    });

    it("Throws error if first param is not array", function () {
      expect(() => findNewApartment.isGoodLocation([10], '10')).to.throw("Invalid input!")
    });

    it("Throws error if first param is not an array and second is not a number", function () {
      expect(() => findNewApartment.isGoodLocation(10, '10')).to.throw("Invalid input!")
    });
  });
  describe("isItAffordable method functionality", function () {

    it("Returns the right message if the budget is less than the price", function () {
      expect(findNewApartment.isItAffordable(200, 100)).to.equal("You don't have enough money for this house!")
    });

    it("Returns the right message if the budget is more than the price", function () {
      expect(findNewApartment.isItAffordable(100, 200)).to.equal("You can afford this home!")
    });

    it("Returns the right message if the budget is equal to the price", function () {
      expect(findNewApartment.isItAffordable(200, 200)).to.equal("You can afford this home!")
    });
    //input validation

    it("Throws error if first param is not a number", function () {
      expect(() => findNewApartment.isItAffordable('10', 10)).to.throw("Invalid input!")
    });

    it("Throws error if second param is not number", function () {
      expect(() => findNewApartment.isItAffordable(10, '10')).to.throw("Invalid input!")
    });

    it("Throws error if both params are not of type number", function () {
      expect(() => findNewApartment.isItAffordable('100', '100')).to.throw("Invalid input!")
    });

    it("Throws error if first param is 0", function () {
      expect(() => findNewApartment.isItAffordable(0, 100)).to.throw("Invalid input!")
    });

    it("Throws error if second param is 0", function () {
      expect(() => findNewApartment.isItAffordable(100, 0)).to.throw("Invalid input!")
    });

    it("Throws error if both params are 0", function () {
      expect(() => findNewApartment.isItAffordable(0, 0)).to.throw("Invalid input!")
    });

    it("Throws error if both params are less than 0", function () {
      expect(() => findNewApartment.isItAffordable(-10, -10)).to.throw("Invalid input!")
    });
  });
});


