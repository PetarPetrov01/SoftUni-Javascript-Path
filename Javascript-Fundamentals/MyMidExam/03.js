function calculateDamage(priceRating, entryPoint, typeOfItems) {
    let priceOfEntry = priceRating[entryPoint]

    let leftSumDamage = 0
    let rightSumDamage = 0

    //left
    for (i = 0; i < entryPoint; i++) {
        if (typeOfItems === 'cheap') {
            if (priceRating[i] < priceOfEntry) {
                leftSumDamage += priceRating[i]
            }
        } else {
            if (priceRating[i] >= priceOfEntry) {
                leftSumDamage += priceRating[i]
            }
        }
    }

    //right
    for (i = entryPoint + 1; i < priceRating.length; i++) {
        if (typeOfItems === 'cheap') {
            if (priceRating[i] < priceOfEntry) {
                rightSumDamage += priceRating[i]
            }
        } else {
            if (priceRating[i] >= priceOfEntry) {
                rightSumDamage += priceRating[i]
            }
        }
    }
    if (leftSumDamage >= rightSumDamage){
        console.log(`Left - ${leftSumDamage}`);
    } else {
        console.log(`Right - ${rightSumDamage}`);
    }
}
calculateDamage([-2, 2, 1, 5, 9, 3, 2, -2, 1, -1, -3, 3],
    7,
    "expensive")
    
    


