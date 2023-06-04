function solve(num,roundPrecision){
if (roundPrecision>15){
    roundPrecision=15
}
let rounded = num.toFixed(roundPrecision)
console.log(`${parseFloat(rounded)}`);
}
solve(3.1415926535897932384626433832795,2)