function stringSub(word, str) {
    let wordsArr = str.toLowerCase().split(' ')
    let lowerCaseWord = word.toLowerCase()
    if (wordsArr.includes(lowerCaseWord)) {
        console.log(word);
    } else {
        console.log(`${word} not found!`);
    }
}
stringSub('javascript',
    'JavaScript is the best programming language'
)