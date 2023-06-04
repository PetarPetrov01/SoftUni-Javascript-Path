function janNotation(input) {
    let numbersArr = []
    let error = false

    for (el of input) {
        if (typeof (el) === 'number') {
            numbersArr.push(el)
        } else {
            if (numbersArr.length < 2) {
                console.log('Error: not enough operands!');
                error = true
                break;
            }
            let resultNum = 0
            let secondNum = numbersArr.pop()
            let firstNum = numbersArr.pop()
            switch (el) {
                case '+':
                    resultNum = firstNum + secondNum
                    break;
                case '-':
                    resultNum = firstNum - secondNum
                    break;
                case '*':
                    resultNum = firstNum * secondNum
                    break;
                case '/':
                    resultNum = firstNum / secondNum
                    break;
            }
            numbersArr.push(resultNum)
        }
    }
    if (numbersArr.length>1){
        error = true
        console.log('Error: too many operands!');
    }
    if (!error){
        console.log(numbersArr[0]);
    }
}
janNotation([15,
    '/']
   
   
   )