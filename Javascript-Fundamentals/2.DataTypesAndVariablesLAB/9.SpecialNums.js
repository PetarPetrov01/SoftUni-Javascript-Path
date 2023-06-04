function specialNum(num) {

    for (let i = 1; i <= num; i++) {
        let digit = String(i)
        let sum = 0
        for (let j = 0; j < digit.length; j++) {
            sum += Number(digit[j])
        }
        if (sum === 5 || sum === 7 || sum === 11) {
            console.log(`${i} -> True`);
        } else {
            console.log(`${i} -> False`);
        }
    }
}
specialNum(15)