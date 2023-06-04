function picollo(input) {
    let parking = new Set()
    for (let el of input) {
        let [command, number] = el.split(', ')
        if (command === 'IN') {
            parking.add(number)
        } else if (command === 'OUT') {
            parking.delete(number)
        }
    }
    let sortedArr = Array.from(parking)
        .sort((a, b) => a.localeCompare(b))
    console.log(sortedArr.join(`\n`));
}
picollo(['IN, CA2844AA',
    'IN, CA1234TA',
    'OUT, CA2844AA',
    'IN, CA9999TT',
    'IN, CA2866HI',
    'OUT, CA1234TA',
    'IN, CA2844AA',
    'OUT, CA2866HI',
    'IN, CA9876HH',
    'IN, CA2822UU']
)