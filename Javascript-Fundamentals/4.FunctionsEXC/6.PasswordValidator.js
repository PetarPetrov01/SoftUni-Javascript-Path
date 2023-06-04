function solve(pass) {
    let digitCount = 0
    let isLengthOk = false
    let symbolCount = 0

    for (char of pass) {
        char = char.charCodeAt(0)
        
        //Functions return true if given symbol is character or number
        let [isChar, isDigit] = [() => ((char >= 65 && char <= 90) || (char >= 97 && char <= 122)) 
            , () => (char >= 48 && char <= 57) ]
        if (isDigit()) {
            digitCount++
        }
        if (isChar() || isDigit()) {
            symbolCount++
        }
    }
    if (pass.length >= 6 && pass.length <= 10) {
        isLengthOk = true
    }
    if (symbolCount === pass.length && digitCount >= 2 && isLengthOk) {
        console.log(`Password is valid`);
    } else {
        if (!isLengthOk) {
            console.log(`Password must be between 6 and 10 characters`);
        }
        if (symbolCount !== pass.length) {
            console.log(`Password must consist only of letters and digits`);
        }
        if (digitCount < 2) {
            console.log(`Password must have at least 2 digits`);
        }
    }
}
solve('Pa$s$s')