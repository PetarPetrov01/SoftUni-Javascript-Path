function activationKeys(input) {
    let activationKey = input.shift()

    let line = input.shift()
    while (line !== 'Generate') {
        let [command, ...info] = line.split('>>>')
        switch (command) {
            case 'Contains':
                let subStr = info[0]
                if (activationKey.includes(subStr)) {
                    console.log(`${activationKey} contains ${subStr}`);
                } else {
                    console.log('Substring not found!');
                }
                break;
            case 'Flip':
                let letterCasing = info[0]
                let startIndex = +info[1]
                let endIndex = +info[2]
                let modifiedLetters = ''
                if (letterCasing === 'Upper') {
                    modifiedLetters = activationKey.substring(startIndex, endIndex).toUpperCase()
                } else {
                    modifiedLetters = activationKey.substring(startIndex, endIndex).toLowerCase()
                }
                activationKey = activationKey.substring(0, startIndex) + modifiedLetters + activationKey.substring(endIndex, activationKey.length)
                console.log(activationKey);
                break;
            case 'Slice':
                let startInd = +info[0]
                let endInd = +info[1]
                activationKey = activationKey.substring(0,startInd) + activationKey.substring(endInd,activationKey.length)
                console.log(activationKey);
                break;
        }
        line = input.shift()
    }
    console.log(`Your activation key is: ${activationKey}`);
}
activationKeys(["abcdefghijklmnopqrstuvwxyz",
"Slice>>>2>>>6",
"Flip>>>Upper>>>3>>>14",
"Flip>>>Lower>>>5>>>7",
"Contains>>>def",
"Contains>>>deF",
"Generate"])

