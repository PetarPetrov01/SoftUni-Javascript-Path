function city(obj) {
    let objectArr = Object.entries(obj)

    for (let [key,value] of objectArr){
        console.log(`${key} -> ${value}`);
    }

    // let keysArr = Object.keys(obj)
    // for (key of keysArr){
    //     console.log(`${key} -> ${obj[key]}`);
    // }
}
city({
    name: "Sofia",
    area: 492,
    population: 1238438,
    country: "Bulgaria",
    postCode: "1000"
})