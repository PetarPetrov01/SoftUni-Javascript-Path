function evenAndOdd(inArr) {
    let odds = 0
    let evens = 0
    for (let i = 0; i < inArr.length; i++){
        inArr[i]=Number(inArr[i])
    }
        for (num of inArr) {
            if (num % 2 === 0) {
                evens += num
            } else {
                odds += num
            }
        }
    console.log(`${evens - odds}`);
}
evenAndOdd([1, 2, 3, 4, 5, 6])