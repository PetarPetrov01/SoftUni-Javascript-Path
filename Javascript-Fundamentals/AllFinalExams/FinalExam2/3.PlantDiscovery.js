function plantDiscovery(input) {
    let n = Number(input.shift())
    let flowersObj = {}

    for (let i = 0; i < n; i++) {
        let [flower, rarity] = input.shift().split('<->')
        rarity = Number(rarity)
        flowersObj[flower] = {
            rarity,
            rating: []
        }
    }

    let token = input.shift()
    while (token !== 'Exhibition') {
        let [command, ...flowerString] = token.split(': ')
        let [flower, property] = flowerString[0].split(' - ')
        if (flowersObj.hasOwnProperty(flower)) {
            switch (command) {
                case 'Rate':
                    let rating = Number(property)
                    flowersObj[flower].rating.push(rating)
                    break;

                case 'Update':
                    let newRarity = Number(property)
                    flowersObj[flower].rarity = newRarity
                    break;

                case 'Reset':
                    flowersObj[flowerString].rating = []
                    break;

                default:
                    console.log('error');
            }
        } else {
            console.log('error');
        }
        token = input.shift()
    }

    console.log('Plants for the exhibition:');
    let arr = Object.keys(flowersObj)
        .forEach(flower => {
            let averageRating
            let arr = flowersObj[flower].rating
            if (!arr.length) {
                averageRating = 0
            } else {
                averageRating = arr.reduce((a, b) => a + b, 0) / arr.length;
            }
            console.log(`- ${flower}; Rarity: ${flowersObj[flower].rarity}; Rating: ${averageRating.toFixed(2)}`)
        })
}
plantDiscovery(["3",
    "Arnoldii<->4",
    "Woodii<->7",
    "Welwitschia<->2",
    "Rate: Woodii - 10",
    "Rate: Welwitschia - 7",
    "Rate: Arnoldii - 3",
    "Rate: Woodii - 5",
    "Update: Woodii - 5",
    "Reset: Arnoldii",
    "Exhibition"])

plantDiscovery(["2",
    "Candelabra<->10",
    "Oahu<->10",
    "Rate: Oahu - 7",
    "Rate: Candelabra - 6",
    "Exhibition"])

