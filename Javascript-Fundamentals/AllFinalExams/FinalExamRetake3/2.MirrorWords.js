function mirrorWords(input) {
    let pattern = /([@#])(?<fWord>[A-Za-z]{3,})\1\1(?<sWord>[A-Za-z]{3,})\1/g
    let validCount = 0
    let mirrorWords = []

    while ((validMatch = pattern.exec(input[0])) !== null) {
        validCount++
        let firstWord = validMatch.groups.fWord
        let secondWord = validMatch.groups.sWord
        let secondReversed = secondWord.split('').reverse().join('')
        if (firstWord === secondReversed) {
            mirrorWords.push([firstWord, secondWord])
        }
    }

    if(validCount>0){
        console.log(`${validCount} word pairs found!`);
    } else {
        console.log('No word pairs found!');
    }

    if (!mirrorWords.length) {
        console.log('No mirror words!');
    } else {
        console.log('The mirror words are:');
        mirrorWords = mirrorWords.map((el)=>el.join(' <=> '))
        console.log(mirrorWords.join(', '));
    }
}
mirrorWords([
    '@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r'
]
)
mirrorWords(['#lol#lol# @#God@@doG@# #abC@@Cba# @Xyu@#uyX#'])