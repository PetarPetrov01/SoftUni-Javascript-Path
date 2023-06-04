function rotation(inArr, rotation) {
    
    for (i = 1; i <= rotation; i++) {
        let last = inArr[0]
        for (j = 0; j < inArr.length-1; j++) { 
            inArr[j] = inArr[j+1]
        }
        inArr[inArr.length - 1] = last
    }
console.log(inArr.join(' '));
}
rotation([51, 47, 32, 61, 21], 2)