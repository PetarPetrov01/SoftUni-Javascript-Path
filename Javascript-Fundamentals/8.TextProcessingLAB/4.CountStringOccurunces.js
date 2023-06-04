function countOccurunces(inputStr, word) {
    let arr = inputStr.split(' ')
    let count = 0

    for (let currentWord of arr) {
        if (currentWord === word){
            count++
        }
    }
    console.log(count);
}
countOccurunces('This is a word and it also is a sentence',
    'is'
)