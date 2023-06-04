function phoneBook(inputArr) {
    let phoneBook = {}
    for (let line of inputArr) {
        let [name, number] = line.split(' ')
        phoneBook[name] = number
    }

    for(let record in phoneBook){
        console.log(`${record} -> ${phoneBook[record]}`);
    }
}
phoneBook(['Tim 0834212554',
    'Peter 0877547887',
    'Bill 0896543112',
    'Tim 0876566344']
)