function addAndSubstract(inArr) {
    let sumOld = 0
    let sumNew = 0

    for (i = 0; i < inArr.length; i++) {
        sumOld += inArr[i]
        if (inArr[i] % 2 == 0) {
            inArr[i] += i
        } else {
            inArr[i] -= i
        }
        sumNew +=inArr[i]
    }
    console.log(inArr);
    console.log(sumOld);
    console.log(sumNew);
}
addAndSubstract([5, 15, 23, 56, 35])