function letterChangeNums(str) {
    let arr = str.split(' ').filter((el) => el.length > 1)
    let fullSum = 0

    for (let combination of arr) {
        let fchar = combination[0]
        let schar = combination[combination.length - 1]
        let num = combination.substring(1, combination.length - 1)
        let fNum = 0
        let sNum = 0

        if (fchar.charCodeAt(0) >= 65 && fchar.charCodeAt(0) <= 90) { //FIRST CHAR UPPERCASE
            fNum = fchar.charCodeAt(0) - 64
            num /= fNum
        } else { //FIRST CHAR LOWERCASE
            fNum = fchar.charCodeAt(0) - 96
            num *= fNum
        }

        if (schar.charCodeAt(0) >= 65 && schar.charCodeAt(0) <= 90) { //SECOND CHAR UPPERCASE
            sNum = schar.charCodeAt(0) - 64
            num -= sNum

        } else { //SECOND CHAR LOWERCASE
            sNum = schar.charCodeAt(0) - 96
            num += sNum
        }
        fullSum += num
    }
    console.log(fullSum.toFixed(2));
}
letterChangeNums('P34562Z q2576f   H456z')