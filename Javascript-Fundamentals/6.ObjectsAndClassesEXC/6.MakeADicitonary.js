function dictionary(input) {

    let dictionaryObj = {}
    let sortArray = []
    for (obj of input) {
        let terms = JSON.parse(obj)
        let arr = Object.entries(terms)[0]
        sortArray.push(arr)
    }

    sortArray = sortArray.sort((a,b)=>a[0].localeCompare(b[0]))
    for (let [term,meaning] of sortArray) {
        dictionaryObj[term] = meaning
    }   

    for (let term in dictionaryObj){
        console.log(`Term: ${term} => Definition: ${dictionaryObj[term]}`);
    }
}
dictionary([
    '{"Coffee":"A hot drink made from the roasted and ground seeds (coffee beans) of a tropical shrub."}',
    '{"Bus":"A large motor vehicle carrying passengers by road, typically one serving the public on a fixed route and for a fare."}',
    '{"Boiler":"A fuel-burning apparatus or container for heating water."}',
    '{"Tape":"A narrow strip of material, typically used to hold or fasten something."}',
    '{"Microphone":"An instrument for converting sound waves into electrical energy variations which may then be amplified, transmitted, or recorded."}'
])
