function NFS(input) {
    let cars = Number(input.shift())
    let carsObj = {}

    for (let i = 0; i < cars; i++) {
        let [name, mileage, fuel] = input.shift().split('|')
        mileage = +mileage
        fuel = +fuel
        carsObj[name] = {
            mileage,
            fuel
        }
    }

    let line = input.shift()
    while (line !== 'Stop') {
        let [command, ...info] = line.split(' : ')
        let car = info.shift()
        info = info.map(Number)
        switch (command) {
            case 'Drive':

                let [distance, fuel] = info

                if (carsObj[car].fuel >= fuel) {
                    carsObj[car].fuel -= fuel
                    carsObj[car].mileage += distance
                    console.log(`${car} driven for ${distance} kilometers. ${fuel} liters of fuel consumed.`);
                    if (carsObj[car].mileage >= 100000) {
                        console.log(`Time to sell the ${car}!`);
                        delete carsObj[car]
                    }
                } else {
                    console.log('Not enough fuel to make that ride');
                    
                }
                break;
            case 'Refuel':
                let refill = info[0]
                if (carsObj[car].fuel + refill >= 75) {
                    console.log(`${car} refueled with ${75 - carsObj[car].fuel} liters`);
                    carsObj[car].fuel = 75
                } else {
                    carsObj[car].fuel += refill
                    console.log(`${car} refueled with ${refill} liters`);
                }
                break;
            case 'Revert':
                let km = info[0]
                carsObj[car].mileage -= km
                if (carsObj[car].mileage <= 10000) {
                    carsObj[car].mileage = 10000
                } else {
                    console.log(`${car} mileage decreased by ${km} kilometers`);
                }
                break;
        }
        line = input.shift()
    }
    for (let car in carsObj) {
        console.log(`${car} -> Mileage: ${carsObj[car].mileage} kms, Fuel in the tank: ${carsObj[car].fuel} lt.`);
    }   
}
NFS([
    '4',
    'Lamborghini Veneno|11111|74',
    'Bugatti Veyron|12345|67',
    'Koenigsegg CCXR|67890|12',
    'Aston Martin Valkryie|99900|50',
    'Drive : Koenigsegg CCXR : 382 : 82',
    'Drive : Aston Martin Valkryie : 99 : 23',
    'Drive : Aston Martin Valkryie : 2 : 1',
    'Refuel : Lamborghini Veneno : 40',
    'Revert : Bugatti Veyron : 2000',
    'Stop'
  ]
  
)