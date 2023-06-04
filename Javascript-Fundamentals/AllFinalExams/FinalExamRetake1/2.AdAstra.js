function adAstra(input) {
    let string = input[0]
    let regex = /([#\|])(?<product>[A-Za-z\s]+)\1(?<date>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d{1,5})\1/g
    let products = []
    let sumCalories = 0
    let valid = regex.exec(string)
    while (valid) {
        products.push({ prod: valid[2], date: valid[3], calories: valid[4] })
        sumCalories += Number(valid[4])
        valid = regex.exec(string)
    }
    console.log(`You have food to last you for: ${Math.floor(sumCalories / 2000)} days!`);

    for(let el of products){
        console.log(`Item: ${el.prod}, Best before: ${el.date}, Nutrition: ${el.calories}`);
    }

}

adAstra([
    '#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|'
]
)
adAstra(['Hello|#Invalid food#19/03/20#450|$5*(@'])