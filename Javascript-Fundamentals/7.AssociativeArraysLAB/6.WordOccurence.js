function wordOccurence(inputArr) {
    let occurence = new Map()
    for (let word of inputArr) {
        if (occurence.has(word)) {
            let amount = occurence.get(word) + 1
            occurence.set(word,amount)
        } else {
            occurence.set(word,1)
        }
    }
    let sortedArr = Array.from(occurence.entries())
    .sort((a,b)=>b[1]-a[1])
    .forEach((el)=>console.log(`${el[0]} -> ${el[1]} times`))
}
wordOccurence(["Here", "is", "the", "first", "sentence", "Here", "is", "another", "sentence", "And", "finally", "the", "third", "sentence"])