function resPass(input) {
    let pass = input.shift()
    let line = input.shift()
    while (line !== 'Done') {
        let commandArr = line.split(' ')
        let command = commandArr[0]
        switch (command) {
            case 'TakeOdd':
                let newPass = ''
                for (let i = 1; i < pass.length; i += 2) {
                    newPass += pass[i]
                }
                console.log(newPass);
                pass = newPass
                break;
            case 'Cut':
                let index = Number(commandArr[1])
                let length = Number(commandArr[2])
                pass = pass.substring(0, index) + pass.substring(index + length, pass.length)
                console.log(pass);
                break;
            case 'Substitute':
                let subStr = commandArr[1]
                let substitute = commandArr[2]
                if (pass.includes(subStr)) {
                    while (pass.includes(subStr)) {
                        pass = pass.replace(subStr,substitute)
                    }
                    console.log(pass);
                } else {
                    console.log('Nothing to replace!');
                }
                break;
        }
        line = input.shift()
    }
    console.log(`Your password is: ${pass}`);
}
resPass(["Siiceercaroetavm!:?:ahsott.:i:nstupmomceqr", 
"TakeOdd",
"Cut 15 3",
"Substitute :: -",
"Substitute | ^",
"Done"])


