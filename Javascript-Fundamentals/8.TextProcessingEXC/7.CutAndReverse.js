function cutAndRevers(input){
let fHalf = input.substring(0,input.length/2)
.split('')
.reverse()
.join('')

let sHalf = input.substring(input.length/2)
.split('')
.reverse()
.join('')

console.log(fHalf);
console.log(sHalf);
}
cutAndRevers('tluciffiDsIsihTgnizamAoSsIsihT')