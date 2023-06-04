function solve(inputArr) {
    let addressBook = {}
    for (let line of inputArr) {
        let [name, address] = line.split(':')
        addressBook[name] = address
    }

    let sortedArr = Object.entries(addressBook)
    sortedArr = sortedArr.sort((a, b) => a[0].localeCompare(b[0]))

    for (el of sortedArr){
        console.log(`${el[0]} -> ${el[1]}`);
    }

}
solve(['Tim:Doe Crossing',
    'Bill:Nelson Place',
    'Peter:Carlyle Ave',
    'Bill:Ornery Rd']
)