function listCreation(input) {
    for (el of input) {
        let person = {
            name: el,
            personalNumber: el.length
        }
        console.log(`Name: ${person.name} -- Personal Number: ${person.personalNumber}`);
    }
}
listCreation([
    'Silas Butler',
    'Adnaan Buckley',
    'Juan Peterson',
    'Brendan Villarreal'
]
)