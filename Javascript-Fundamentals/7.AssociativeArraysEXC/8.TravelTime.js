function travel(input) {
    let countries = {}
    for (let row of input) {
        let [country, town, price] = row.split(' > ')
        price = +price
        if (!countries.hasOwnProperty(country)) {
            countries[country] = {}
        }
        if (!countries[country].hasOwnProperty(town)) {
            countries[country][town] = price
        } else if (countries[country][town] > price) {
            countries[country][town] = price
        }
    }

    let countryKeys = Object.keys(countries)
    let sortedKeys = countryKeys.sort((a, b) => a.localeCompare(b))

    for (let el of sortedKeys) {
        let entries = Object.entries(countries[el])
        let sortedTowns = entries.sort((a, b) => a[1] - b[1])

        let print = []
        for (town of sortedTowns) {
            print.push(town.join(' -> '))

        }
        console.log(`${el} -> ${print.join(' ')}`);

    }
}
travel([
    'Bulgaria > Sofia > 25000',
    'Bulgaria > Sofia > 25000',
    'Kalimdor > Orgrimar > 25000',
    'Albania > Tirana > 25000',
    'Bulgaria > Varna > 25010',
    'Bulgaria > Lukovit > 10'
]

)