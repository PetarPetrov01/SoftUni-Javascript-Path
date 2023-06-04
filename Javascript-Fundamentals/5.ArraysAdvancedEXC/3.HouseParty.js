function addToList(input) {
    result = []
    for (command of input) {
        let comm = command.split(' ')

        let name = comm[0]
        let action = comm[2]
        if (action === 'going!') {
            if (result.includes(name)) {
                console.log(`${name} is already in the list!`)
            } else {
                result.push(name)
            }
        } else {
            if (result.includes(name)) {
                let index = result.indexOf(name)
                result.splice(index, 1)
            } else {
                console.log(`${name} is not in the list!`)
            }
        }
    }
    console.log(result.join(`\n`));
}1
addToList(['Tom is going!',
'Annie is going!',
'Tom is going!',
'Garry is going!',
'Jerry is going!'])