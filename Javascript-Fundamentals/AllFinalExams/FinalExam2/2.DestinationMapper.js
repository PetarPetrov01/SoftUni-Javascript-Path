function destinationMapper(input) {
    let pattern = /([=\/])(?<country>[A-Z][A-Za-z]{2,})\1/g
    let sumTravel = 0
    let destinations = []

    while ((validMatch = pattern.exec(input)) !== null) {
        destinations.push(validMatch.groups.country)
        sumTravel += validMatch.groups.country.length
    }
    console.log(`Destinations: ${destinations.join(', ')}`);
    console.log(`Travel Points: ${sumTravel}`);
}
destinationMapper("ThisIs some InvalidInput")