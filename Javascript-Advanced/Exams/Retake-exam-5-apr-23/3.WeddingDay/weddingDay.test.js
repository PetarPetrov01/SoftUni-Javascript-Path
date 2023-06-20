const { expect } = require('chai')
const weddingDay = require('./weddingDay')

describe('Tests', () => {
  describe('PickVenue method tests', () => {
    it('Test input', () => {
      expect(() => weddingDay.pickVenue(1, 1, '')).to.throw('Invalid Information!')
      expect(() => weddingDay.pickVenue(1, '1', 1)).to.throw('Invalid Information!')
      expect(() => weddingDay.pickVenue('1', 1, [])).to.throw('Invalid Information!')
      expect(() => weddingDay.pickVenue('1', 1, 'Varna')).to.throw('Invalid Information!')
      expect(() => weddingDay.pickVenue('', '', '')).to.throw('Invalid Information!')
      expect(() => weddingDay.pickVenue(1, 1, 'Plovdiv')).to.throw("The location of this venue is not in the correct area!")
    })

    it('Happy case', () => {
      expect(weddingDay.pickVenue(200, 100, 'Varna')).to.equal(`This venue meets the requirements, with capacity of 200 guests and 100$ cover.`)
      expect(weddingDay.pickVenue(150, 120, 'Varna')).to.equal(`This venue meets the requirements, with capacity of 150 guests and 120$ cover.`)
    })

    it('False cases', () => {
      expect(weddingDay.pickVenue(200, 130, 'Varna')).to.equal("This venue does not meet your requirements!")
      expect(weddingDay.pickVenue(140, 100, 'Varna')).to.equal("This venue does not meet your requirements!")
      expect(weddingDay.pickVenue(140, 130, 'Varna')).to.equal("This venue does not meet your requirements!")
    })

  })

  describe('otherSpendings method tests', () => {
    it('Test input', () => {
      expect(() => weddingDay.otherSpendings('flowers', ['pictures'], true)).to.throw("Invalid Information!")
      expect(() => weddingDay.otherSpendings(['flowers'], 'pictures', true)).to.throw("Invalid Information!")
      expect(() => weddingDay.otherSpendings(['flowers'], ['pictures'], 1)).to.throw("Invalid Information!")
      expect(() => weddingDay.otherSpendings('flowers', 'pictures', 1)).to.throw("Invalid Information!")
    })

    it('Happy cases with discount', () => {
      expect(weddingDay.otherSpendings(['flowers'], ['pictures'], true)).to.equal(`You spend 1020$ for wedding decoration and photography with 15% discount!`)
      expect(weddingDay.otherSpendings(['Fabric drapes and curtains'], ['video'], true)).to.equal(`You spend 1445$ for wedding decoration and photography with 15% discount!`)
      expect(weddingDay.otherSpendings(['flowers', 'Fabric drapes and curtains'], ['video', 'pictures'], true)).to.equal(`You spend 2465$ for wedding decoration and photography with 15% discount!`)
    })

    it('Happy cases without discount', () => {
      expect(weddingDay.otherSpendings(['flowers'], ['pictures'], false)).to.equal(`You spend 1200$ for wedding decoration and photography!`)
      expect(weddingDay.otherSpendings(['flowers', 'flowers'], [], false)).to.equal(`You spend 1000$ for wedding decoration and photography!`)
      expect(weddingDay.otherSpendings([], ['pictures', 'pictures'], false)).to.equal(`You spend 1400$ for wedding decoration and photography!`)
      expect(weddingDay.otherSpendings(['Fabric drapes and curtains'], ['video'], false)).to.equal(`You spend 1700$ for wedding decoration and photography!`)
      expect(weddingDay.otherSpendings(['flowers', 'Fabric drapes and curtains'], ['video', 'pictures'], false)).to.equal(`You spend 2900$ for wedding decoration and photography!`)
    })


  })

  describe('tableDistribution method tests', () => {
    it('Test input', () => {
      expect(() => weddingDay.tableDistribution('1', 1)).to.throw("Invalid Information!")
      expect(() => weddingDay.tableDistribution(1, '1')).to.throw("Invalid Information!")
      expect(() => weddingDay.tableDistribution('1', '1')).to.throw("Invalid Information!")
      expect(() => weddingDay.tableDistribution(-1, 1)).to.throw("Invalid Information!")
      expect(() => weddingDay.tableDistribution(1, -1)).to.throw("Invalid Information!")
      expect(() => weddingDay.tableDistribution(-1, -2)).to.throw("Invalid Information!")

    })

    it('Less than 6 people on table', () => {
      expect(weddingDay.tableDistribution(10, 5)).to.equal(`There is only 2 people on every table, you can join some tables.`)
      expect(weddingDay.tableDistribution(10, 2)).to.equal(`There is only 5 people on every table, you can join some tables.`)

    })

    it('More than 6 people on table', () => {
      expect(weddingDay.tableDistribution(12, 2)).to.equal(`You have 2 tables with 6 guests on table.`)
      expect(weddingDay.tableDistribution(24, 3)).to.equal(`You have 3 tables with 8 guests on table.`)
    })
  })
})