function secretChat(input) {
    let message = input.shift()
    let line = input.shift()

    while (line !== 'Reveal') {
        let instructionsArr = line.split(':|:')
        let instruction = instructionsArr[0]
        let subStr = ''
        let error = false
        switch (instruction) {
            case 'InsertSpace':
                let index = Number(instructionsArr[1])
                message = message.substring(0, index) + ' ' + message.substring(index, message.length)
                break;
            case 'Reverse':
                subStr = instructionsArr[1]
                if (message.includes(subStr)) {
                    let reversed = subStr.split('').reverse().join('')
                    message = message.replace(subStr, '') + reversed
                } else {
                    console.log('error');
                    error = true
                }
                break;
            case 'ChangeAll':
                subStr = instructionsArr[1]
                let replacement = instructionsArr[2]
                while (message.includes(subStr)) {
                    message = message.replace(subStr, replacement)
                }
                break;
        }
        line = input.shift()
        if (!error) {
            console.log(message)
        }
    }
    console.log(`You have a new text message: ${message}`);
}
secretChat([
    'Hiware?uiy',
    'ChangeAll:|:i:|:o',
    'Reverse:|:?uoy',
    'Reverse:|:jd',
    'InsertSpace:|:3',
    'InsertSpace:|:7',
    'Reveal'
]
)
