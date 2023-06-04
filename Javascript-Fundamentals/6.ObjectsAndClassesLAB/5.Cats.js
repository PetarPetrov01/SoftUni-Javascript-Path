function cat(arr) {
    class Cat {
        constructor(name, age) {
            this.name = name
            this.age = age
            this.meow = () => console.log(`${this.name}, age ${this.age} says Meow`)
        }
    }

    let finalArr = []

    for (let el of arr) {
        catsArr = el.split(' ')
        let cat = new Cat(catsArr[0], catsArr[1])
        cat.meow()
    }
}
cat(['Candy 1', 'Poppy 3', 'Nyx 2'])