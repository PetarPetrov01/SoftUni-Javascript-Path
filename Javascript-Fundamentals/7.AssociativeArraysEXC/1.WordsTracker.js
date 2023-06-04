function wordTracker(input) {
    let words = input.shift().split(' ')
    let tracker = {}

    for (let word of words) {
        tracker[word] = 0
    }

    for (let word of input) {
        if (tracker.hasOwnProperty(word)) {
            tracker[word] += 1
        }
    }
    let sortedTracker = Object.entries(tracker)
    .sort((a,b)=>b[1]-a[1])
    .forEach((el)=>{console.log(`${el[0]} - ${el[1]}`);})
    
}
wordTracker([
    'is the', 
    'first', 'sentence', 'Here', 'is', 'another', 'the', 'And', 'finally', 'the', 'the', 'sentence']
    
)