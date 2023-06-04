function pirates(input) {
    let line = input.shift()
    let citiesObj = {}
    while (line !== 'Sail') {
        let [city, population, gold] = line.split('||')
        if(!citiesObj.hasOwnProperty(city)){
            citiesObj[city] = {
                population: +population,
                gold: +gold
            }
        } else {
            citiesObj[city].population += +population
            citiesObj[city].gold += +gold
        }
        
        line = input.shift()
    }

    line = input.shift()
    while (line !== 'End') {
        let [command, town, ...info] = line.split('=>')
        if (command === 'Plunder') {
            let people = +info[0]
            let gold = +info[1]
            citiesObj[town].population -= people
            citiesObj[town].gold -= gold
            console.log(`${town} plundered! ${gold} gold stolen, ${people} citizens killed.`);

            if (citiesObj[town].population <= 0 || citiesObj[town].gold <= 0) {
                console.log(`${town} has been wiped off the map!`);
                delete citiesObj[town]
            }
        } else {
            let gold = +info[0]
            if (gold < 0) {
                console.log('Gold added cannot be a negative number!');
            } else {
                citiesObj[town].gold += gold
                console.log(`${gold} gold added to the city treasury. ${town} now has ${citiesObj[town].gold} gold.`);
            }
        }
        line = input.shift()
    }

    let entries = Object.entries(citiesObj)
    if (!entries.length){
        console.log('Ahoy, Captain! All targets have been plundered and destroyed!');
    } else {
        console.log(`Ahoy, Captain! There are ${entries.length} wealthy settlements to go to:`);
        for (let [key,value] of entries){
            
           console.log(`${key} -> Population: ${value.population} citizens, Gold: ${value.gold} kg`);
        }
    }
}
pirates(["Nassau||95000||1000",
"San Juan||930000||1250",
"Campeche||270000||690",
"Port Royal||320000||1000",
"Port Royal||100000||2000",
"Sail",
"Prosper=>Port Royal=>-200",
"Plunder=>Nassau=>94000=>750",
"Plunder=>Nassau=>1000=>150",
"Plunder=>Campeche=>150000=>690",
"End"])

