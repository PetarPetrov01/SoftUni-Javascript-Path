function condenseArray(inArr) {
    for (i = 0; i < inArr.length; i++) {
        inArr[i] = Number(inArr[i])
    }
    
    while (inArr.length > 1) {
        let condensed = []
        for (let i = 0; i < inArr.length-1; i++) {
            condensed[i] = inArr[i] + inArr[i + 1]
        }
        inArr = condensed
    }
    console.log(inArr[0]);
}
condenseArray([5,0,4,1,2])