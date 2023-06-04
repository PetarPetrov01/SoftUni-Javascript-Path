function meetings(inputArr) {
    let assocArr = {}
    for (let entries of inputArr){
        entry = entries.split(' ')
        if (assocArr.hasOwnProperty(entry[0])) {
            console.log(`Conflict on ${entry[0]}!`);
        } else {
            console.log(`Scheduled for ${entry[0]}`);
            assocArr[entry[0]] = entry[1]
        }
    }

    for (let day in assocArr) {
        console.log(`${day} -> ${assocArr[day]}`);
    }
}
meetings(['Monday Peter',
    'Wednesday Bill',
    'Monday Tim',
    'Friday Tim']
)
