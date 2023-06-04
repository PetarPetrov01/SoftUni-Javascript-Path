function amazing(a) {
    a = String(a)
    let sum = 0
    for (i = 0; i < a.length; i++) {
        let ch = Number(a[i])
        sum += ch
    }
    let result = sum.toString().includes('9')
    console.log(result ?
        `${a} Amazing? True` :
        `${a} Amazing? False`);
}
amazing(1134)