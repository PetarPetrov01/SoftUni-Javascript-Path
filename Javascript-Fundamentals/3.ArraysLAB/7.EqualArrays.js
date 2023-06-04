function equalArrays(firstArray, secondArray) {
    for (i = 0; i < firstArray.length; i++) {
        firstArray[i] = Number(firstArray[i])
        secondArray[i] = Number(secondArray[i])
    }
    let sum = 0
    let index = 0
    let flag = true
    for (let j = 0; j < firstArray.length; j++) {

        if (firstArray[j] === secondArray[j]) {
            sum += firstArray[j]
        } else {
            flag = false
            break;
        }
        index++
    }
    console.log(flag ? `Arrays are identical. Sum: ${sum}` : `Arrays are not identical. Found difference at ${index} index`);
}
equalArrays(['1','2','3','4','5'], ['1','2','4','4','5'])