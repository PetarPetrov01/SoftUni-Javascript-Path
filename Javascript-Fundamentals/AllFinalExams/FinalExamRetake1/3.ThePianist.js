function pianist(inputArr) {
    let numOfPieces = Number(inputArr.shift())
    let pieces = []
    for (let i = 0; i < numOfPieces; i++) {
        let currentPiece = inputArr.shift().split('|')
        let name = currentPiece[0]
        let composer = currentPiece[1]
        let key = currentPiece[2]
        pieces.push({ name, composer, key })
    }

    for (el of inputArr) {
        if (el === 'Stop') {
            break;
        }

        let commandsArr = el.split('|')
        let command = commandsArr[0]
        let name = commandsArr[1]
        let index;
        switch (command) {
            case 'Add':
                let composer = commandsArr[2]
                let key = commandsArr[3]
                if (pieces.some((a) => a.name === name)) {
                    console.log(`${name} is already in the collection!`);
                } else {
                    pieces.push({ name, composer, key })
                    console.log(`${name} by ${composer} in ${key} added to the collection!`);
                }
                break;
            case 'Remove':
                if (pieces.some((a) => a.name === name)) {
                    index = pieces.findIndex((a) => a.name == name)
                    console.log(`Successfully removed ${pieces[index].name}!`);
                    pieces.splice(index,1)
                } else {
                    console.log(`Invalid operation! ${name} does not exist in the collection.`);
                }
                break;
            case 'ChangeKey':
                let newKey = commandsArr[2]
                if (pieces.some((a) => a.name === name)) {
                    index = pieces.findIndex((a) => a.name == name)
                    pieces[index].key = newKey
                    console.log(`Changed the key of ${name} to ${newKey}!`);
                } else {
                    console.log(`Invalid operation! ${name} does not exist in the collection.`);
                }
                break;
        }
    }
    for (let el of pieces){
        console.log(`${el.name} -> Composer: ${el.composer}, Key: ${el.key}`);
    }
}
pianist([
    '4',
    'Eine kleine Nachtmusik|Mozart|G Major',
    'La Campanella|Liszt|G# Minor',
    'The Marriage of Figaro|Mozart|G Major',
    'Hungarian Dance No.5|Brahms|G Minor',
    'Add|Spring|Vivaldi|E Major',
    'Remove|The Marriage of Figaro',
    'Remove|Turkish March',
    'ChangeKey|Spring|C Major',
    'Add|Nocturne|Chopin|C# Minor',
    'Stop'
  ]
  
)