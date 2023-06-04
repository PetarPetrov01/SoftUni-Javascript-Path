function softUniBar(input) {
    let regex = /%(?<name>[A-Z][a-z]*)%.*?<(?<product>\w+)>.*?\|(?<count>\d+)\|.*?(?<price>-?\d+(\.\d+)*)\$/

    let sum = 0
    while (input[0] !== 'end of shift') {
        let string = input.shift()

        let valid = regex.exec(string)

        if (valid !== null) {
            let { name, product, count, price } = valid.groups
            console.log(`${name}: ${product} - ${(count * price).toFixed(2)}`);
            sum += Number(count) * Number(price)
        }
    }
    console.log(`Total income: ${sum.toFixed(2)}`);
}
softUniBar(['%George%<Croissant>|2|10.3$',
    '%Peter%<Gum>|1|1.3$',
    '%Maria%<Cola>|1|2.4$',
    'end of shift']


)