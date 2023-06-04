function solve(input) {
    let regEx = /\b([A-Z][a-z]+) [A-Z][a-z]+/g
    let valids = []
    while ((validName = regEx.exec(input)) !== null){
        valids.push(validName[0])
    }
    console.log(valids.join(' '));
}
solve("Ivan Ivanov, Ivan ivanov, ivan Ivanov, IVan Ivanov, Test Testov, Ivan	Ivanov")

function solve(input) {
    let regEx = /\b([A-Z][a-z]+) [A-Z][a-z]+/g
    
    let sh = input.match(regEx)
    console.log(sh.join(' '));
 }
 solve("Ivan Ivanov, Ivan ivanov, ivan Ivanov, IVan Ivanov, Test Testov, Ivan	Ivanov")