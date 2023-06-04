function reverseInPlace(inArr) {
    for (i = 0; i < inArr.length  / 2;i++){
        let first = inArr[i]
        let last = inArr[inArr.length-1-i]
        inArr[i] = last
        inArr[inArr.length-1-i] = first
    }
    console.log(inArr.join(' '));
}
reverseInPlace(['33', '123', '0','a'])