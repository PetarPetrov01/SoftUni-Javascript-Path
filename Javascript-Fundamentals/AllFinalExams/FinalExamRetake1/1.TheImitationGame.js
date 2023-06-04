function theImitationGame(inputArr) {
    let message = inputArr.shift()

    while (inputArr[0] !== 'Decode') {
        let string = inputArr.shift()
        let commandsArr = string.split('|')
        let command = commandsArr[0]
        switch (command) {
            case 'Move':
                let n = +commandsArr[1]
                let lettersToMove = message.substring(0, n)
                message = message.replace(lettersToMove, '')
                message += lettersToMove
                break;
            case 'Insert':
                let index = +commandsArr[1]
                let value = commandsArr[2]
                message = message.substring(0, index) + value + message.substring(index)
                break;
            case 'ChangeAll':
                while(message.includes(commandsArr[1])){
                    message = message.replace(commandsArr[1], commandsArr[2])
                }
                break;
        }
        
    }
    console.log(`The decrypted message is: ${message}`);
}
theImitationGame([
    'owyouh',
    'Move|2',
    'Move|3',
    'Insert|3|are',
    'Insert|9|?',
    'Decode'
]

)