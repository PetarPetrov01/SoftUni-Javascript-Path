function convertToObject(inputString) {
    let inJSON = JSON.parse(inputString)
    let entriesArr = Object.entries(inJSON)
    for (let [key, value] of entriesArr){
        console.log(`${key}: ${value}`);
    }
}
convertToObject('{"name": "George", "age": 40, "town": "Sofia"}')