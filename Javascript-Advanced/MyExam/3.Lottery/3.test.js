const { expect } = require('chai')
const lottery = require('./Lottery')

describe('Tests', () => {
    describe('buyLotteryTicket method tests', () => {

        it('Input testing', () => {
            expect(() => lottery.buyLotteryTicket('1', 1, true)).to.throw("Invalid input!")
            expect(() => lottery.buyLotteryTicket(1, '1', true)).to.throw("Invalid input!")
            expect(() => lottery.buyLotteryTicket(1, 1, 'as')).to.throw("Invalid input!")
            expect(() => lottery.buyLotteryTicket('1', '1', 'as')).to.throw("Invalid input!")
            expect(() => lottery.buyLotteryTicket([1], [1, 2], true)).to.throw("Invalid input!")
            expect(() => lottery.buyLotteryTicket([1, 2], [1], true)).to.throw("Invalid input!")

        })

        it('Unable to buy', () => {
            expect(() => lottery.buyLotteryTicket(2, 1, false)).to.throw("Unable to buy lottery ticket!")
            expect(() => lottery.buyLotteryTicket(2, 4, false)).to.throw("Unable to buy lottery ticket!")
            expect(() => lottery.buyLotteryTicket(0, 4, false)).to.throw("Unable to buy lottery ticket!")
            expect(() => lottery.buyLotteryTicket(4, 0, false)).to.throw("Unable to buy lottery ticket!")
        })

        it('Happy case', () => {
            expect(lottery.buyLotteryTicket(20, 10, true)).to.equal("You bought 10 tickets for 200$.")
            expect(lottery.buyLotteryTicket(10, 20, true)).to.equal("You bought 20 tickets for 200$.")
            //exaclty equal to 1
            expect(lottery.buyLotteryTicket(1, 1, true)).to.equal("You bought 1 tickets for 1$.")
        })

    })


    describe('buyLotteryTicket method tests', () => {

        it('Input testing', () => {
            expect(() => lottery.checkTicket([1, 2, 3, 4, 5, 6], 1)).to.throw("Invalid input!")
            expect(() => lottery.checkTicket(1, [1, 2, 3, 4, 5, 6])).to.throw("Invalid input!")
            expect(() => lottery.checkTicket(1, 1)).to.throw("Invalid input!")
            expect(() => lottery.checkTicket([2, 3, 4, 5, 6, 7], '1,2,3,4,5,6')).to.throw("Invalid input!")
            expect(() => lottery.checkTicket([2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7])).to.throw("Invalid input!")
        })

        it('Happy case', () => {
            expect(lottery.checkTicket([1, 2, 3, 90, 80, 70], [1, 2, 3, 4, 5, 6])).to.equal("Congratulations you win, check your reward!")
            expect(lottery.checkTicket([1, 2, 3, 4, 80, 70], [1, 2, 3, 4, 5, 6])).to.equal("Congratulations you win, check your reward!")
            expect(lottery.checkTicket([11, 22, 33, 4, 8, 7], [11, 22, 33, 4, 5, 6])).to.equal("Congratulations you win, check your reward!")
            expect(lottery.checkTicket([11, 22, 33, 44, 55, 7], [11, 22, 33, 44, 55, 6])).to.equal("Congratulations you win, check your reward!")
        })

        it('Jackpot', () => {
            expect(lottery.checkTicket([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])).to.equal('You win the JACKPOT!!!')
            expect(lottery.checkTicket([11, 22, 33, 44, 55, 66], [11, 22, 33, 44, 55, 66])).to.equal('You win the JACKPOT!!!')
        })


        describe('secondChance method tests', () => {
            it('Input testing', () => {
                expect(() => lottery.secondChance('1', [1, 2, 3])).to.throw("Invalid input!")
                expect(() => lottery.secondChance(1, '1,2,3')).to.throw("Invalid input!")
                expect(() => lottery.secondChance('1', '1')).to.throw("Invalid input!")
                expect(() => lottery.secondChance([], [])).to.throw("Invalid input!")
                expect(() => lottery.secondChance(1, 1)).to.throw("Invalid input!")
            })

            it('In case of win', () => {
                expect(lottery.secondChance(1, [1, 2, 3])).to.equal("You win our second chance prize!")
                expect(lottery.secondChance(33, [11, 22, 33])).to.equal("You win our second chance prize!")
                expect(lottery.secondChance(33, [33])).to.equal("You win our second chance prize!")
                expect(lottery.secondChance(4, [33, 23, 3, 4, 12])).to.equal("You win our second chance prize!")

            })

            it('In case of lose', () => {
                expect(lottery.secondChance(4, [1, 2, 3])).to.equal("Sorry, your ticket didn't win!")
                expect(lottery.secondChance(22, [1, 2, 3])).to.equal("Sorry, your ticket didn't win!")
                expect(lottery.secondChance(10, [1, 2, 3])).to.equal("Sorry, your ticket didn't win!")
            })
        })
    })
})