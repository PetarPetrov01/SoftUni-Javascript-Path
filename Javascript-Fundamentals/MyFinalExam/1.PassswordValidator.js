function solve(inputArr) {
    let pass = inputArr.shift()

    for (let line of inputArr) {
        if (line === 'Complete') {
            break;
        }
        let log = true

        let commandsArr = line.split(' ')
        let command = commandsArr[0]

        switch (command) {
            case 'Insert':
                if(commandsArr.length>3){
                    break;
                }

                let index = Number(commandsArr[1])
                let char = commandsArr[2]
                pass = pass.substring(0, index) + char + pass.substring(index,pass.length)
                break;
            case 'Replace':
                if(commandsArr.length>3){
                    break;
                }

                let ch = commandsArr[1]
                let value = Number(commandsArr[2])

                let sum = ch.charCodeAt(0) + value
                let newCh = String.fromCharCode(sum)

                while (pass.includes(ch)) {
                    pass = pass.replace(ch, newCh)
                }
                break;
            case 'Make':
                if(commandsArr.length>3){   //INvalid
                    break;
                }

                let i = Number(commandsArr[2])
                let newChar = pass.charAt(i)
                if (commandsArr[1] === 'Lower') {
                    pass = pass.substring(0, i) + newChar.toLowerCase() + pass.substring(i + 1, pass.length)
                } else if (commandsArr[1] === 'Upper') {
                    pass = pass.substring(0, i) + newChar.toUpperCase() + pass.substring(i + 1, pass.length)
                }
                break;
            case 'Validation':
                if(commandsArr.length>1){   //INvalid
                    break;
                }

                if (pass.length < 8) {
                    console.log('Password must be at least 8 characters long!');
                }
                if (!/^[A-Za-z0-9_]+$/.test(pass)) {
                    console.log('Password must consist only of letters, digits and _!');
                }
                if (pass.match(/[A-Z]+/) === null) {
                    console.log('Password must consist at least one uppercase letter!');
                }
                if (pass.match(/[a-z]+/) === null) {
                    console.log('Password must consist at least one lowercase letter!');
                }
                if (pass.match(/\d+/) === null) {
                    console.log('Password must consist at least one digit!');
                }
                log = false;
                break;
            default:
                log = false
                break;
        }

        if (log) {
            console.log(pass);
        }
    }
}
// solve((['invalidpassword*',
//     'Add 2 p',
//     'Replace i -50',
//     'Replace * 10',
//     'Make Upper 2',
//     'Validation',
//     'Complete'])
// )

console.log('-------');
solve((['12345+6789',
'Insert 3 R',
'Replace 5 15',
'Validation',
'Make Lower 3',
'Complete'])
)