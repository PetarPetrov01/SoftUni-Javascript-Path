function vehicleClass() {
    class Vehicle {
        constructor(type, model, parts, fuel) {
            this.type = type
            this.model = model
            this.parts = {
                engine: Number(parts.engine),
                power: Number(parts.power),
                quality: parts.engine * parts.power
            }
            this.fuel = fuel
            this.drive = (fuelLoss) => this.fuel -= fuelLoss
        }
    }
    let parts = {engine: 9, power: 500};
let vehicle = new Vehicle('l', 'k', parts, 840);
vehicle.drive(20);
console.log(vehicle.fuel);

}
vehicleClass()
