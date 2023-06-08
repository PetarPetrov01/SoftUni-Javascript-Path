const { expect } = require('chai')
const testNumbers = require('./TestNumbers')

describe('Test Numbers', () => {

    describe('sumNumber', () => {
        it('Returns the right answer for positive numbers', () => {
            expect(testNumbers.sumNumbers(1, 1)).to.equal('2.00')
        });

        it('Returns the right answer with negative number', () => {
            expect(testNumbers.sumNumbers(-1, 3)).to.equal('2.00')
        });

        it('Returns the right result with right delimeter', () => {
            expect(testNumbers.sumNumbers(1.666, 1.222)).to.equal('2.89')
        });

        it('Returns undefined for non-number parameters', () => {
            expect(testNumbers.sumNumbers('1', '2')).to.equal(undefined)
            expect(testNumbers.sumNumbers(1, '2')).to.equal(undefined)
        });
    });

    describe('numberChecker', () => {
        it('Return the right answer for even number', () => {
            expect(testNumbers.numberChecker('2')).to.equal('The number is even!')
        })

        it('Return the right answer for odd number', () => {
            expect(testNumbers.numberChecker('3')).to.equal('The number is odd!')
        })

        it('Throws an error if passed paramater is not a number', () => {
            expect(() => testNumbers.numberChecker('aa')).to.throw("The input is not a number!")
        })

        it('Return the right answer for negatiev num', () => {
            expect(testNumbers.numberChecker('-3')).to.equal('The number is odd!')
        })
    })

    describe('averageSumArray', () => {
        it('Returns the right answer for even elements array', () => {
            expect(testNumbers.averageSumArray([1, 2, 3, 4])).to.equal(2.5)
        })

        it('Returns the right answer for odd elements array', () => {
            expect(testNumbers.averageSumArray([5, 1, 3])).to.equal(3)
        })
    })
})