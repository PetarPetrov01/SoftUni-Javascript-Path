const { expect } = require('chai')
const ChristmasMovies = require('./02. Christmas Movies_Resources')

describe('ChristmasMovies tests', () => {
    let cm;
    describe('Instantiation', () => {

        it('Check all properties', () => {
            cm = new ChristmasMovies()
            expect(cm.movieCollection).to.eql([])
            expect(cm.movieCollection.length).to.equal(0)
            expect(cm.watched).to.eql({})
            expect(cm.actors).to.eql([])
            expect(cm.actors.length).to.equal(0)
        })
    })

    describe('buyMovie method', () => {
        cm = new ChristmasMovies()
        it('Return the right message when coreclty adding a movie', () => {

            expect(cm.buyMovie('someMovie', ['Actor 1', 'Actor 2']))
                .to.equal('You just got someMovie to your collection in which Actor 1, Actor 2 are taking part!')
        })

        it('Throws an error if the movie already exists', () => {

            expect(() => cm.buyMovie('someMovie', ['Actor 1', 'Actor 2'])).to.throw('You already own someMovie in your collection!')
        })
    })

    describe('discardMovie', () => {
        cm = new ChristmasMovies()
        it("Throws an error if the movie doesn't exist", () => {

            expect(() => cm.discardMovie('wrongName')).to.throw('wrongName is not at your collection!')
        })

        it("Throws an error if the movie isn't watched", () => {
            expect(() => cm.discardMovie('someMovie')).to.throw('someMovie is not watched!')
        })

        it("Throws an error if the movie isn't watched", () => {
            cm.buyMovie('someMovie')
            cm.watchMovie('someMovie')
            expect(cm.discardMovie('someMovie')).to.equal('You just threw away someMovie!')
        })
    })

    describe('watchMovie', () => {
        cm = new ChristmasMovies()
        it("Throws an error if the movie isn't in the collection", () => {
            expect(() => cm.watchMovie('notExisting')).to.throw('No such movie in your collection!')
        })

        it('Returns the right count watched movie', () => {
            cm.buyMovie('someMovie', ['Actor 1', 'Actor 2'])
            cm.watchMovie('someMovie')
            cm.watchMovie('someMovie')
            expect(cm.watched['someMovie']).to.equal(2)
        })
    })

    describe('favouriteMovie', () => {

        it("Throws an error if no movies are watched", () => {
            cm = new ChristmasMovies()
            expect(() => cm.favouriteMovie()).to.throw('You have not watched a movie yet this year!')
        })

        it("Returns the right movie as favourite", () => {
            cm.buyMovie('someMovie', ['Actor 1', 'Actor 2'])
            cm.buyMovie('someFilm', ['Actor 1', 'Actor 2'])
            cm.watchMovie('someMovie')
            cm.watchMovie('someMovie')
            cm.watchMovie('someFilm')
            expect(cm.favouriteMovie()).to.equal('Your favourite movie is someMovie and you have watched it 2 times!')
        })
    })

    describe('mostStarredActors', () => {

        it('Throws an error if there are no movies in the collection', () => {
            cm = new ChristmasMovies()
            expect(() => cm.mostStarredActor()).to.throw('You have not watched a movie yet this year!')
        })

        it('Returns the right actor', () => {
            cm = new ChristmasMovies()
            cm.buyMovie('someMovie', ['Actor 1', 'Actor 2'])
            cm.buyMovie('someFilm', ['Act 1', 'Act 2', 'Actor 1'])
            cm.buyMovie('randomFilm', ['Actor 1'])
            expect(cm.mostStarredActor()).to.equal('The most starred actor is Actor 1 and starred in 3 movies!')
        })
    })
})