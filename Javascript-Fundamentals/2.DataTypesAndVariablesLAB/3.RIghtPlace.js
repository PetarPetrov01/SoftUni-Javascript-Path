function rightPlace(str, char, result) {

let res = str.replace('_',char)
let out = res=== result? 'Matched':'Not Matched'
console.log(out);
}
rightPlace('Str_ng', 'i', 'String')