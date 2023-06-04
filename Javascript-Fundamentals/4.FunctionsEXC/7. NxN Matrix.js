function solve(num) {
  let row = ''
  for (i = 1; i <= num; i++) {
    row += `${num} `
  }
  for (i = 1; i <= num; i++) {
    console.log(row);
  }
}


function result(num) {
  let numToString = num + ' '

  let timesPrint = () => {
    return numToString.repeat(num)
  }
  for (i = 0; i < num; i++){
    console.log(timesPrint(i)); 
  }
}
result(4)