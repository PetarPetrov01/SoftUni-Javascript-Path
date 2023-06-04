function heroesRegister(input) {

    let heroes = []
    for (line of input) {
        let [name, level, items] = line.split(' / ')

        let hero = {
            name,
            level: +level,
            items
        }
        heroes.push(hero)
    }
    let sortedArr = heroes.sort((a, b) => a.level - b.level)

    sortedArr.forEach(hero => {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    })
}

heroesRegister([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]
)