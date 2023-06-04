function centuriesToMin (cen) {
let year = cen*100
let days = Math.trunc(year*365.2422);
let hours = days*24
let minutes = hours*60
console.log(`${cen} centuries = ${year.toFixed(0)} years = ${days.toFixed(0)} days = ${hours.toFixed(0)} hours = ${minutes.toFixed(0)} minutes`);

}
centuriesToMin(1)