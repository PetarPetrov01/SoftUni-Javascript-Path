function reverse(n, inArr) {
    let arr = []
    for (i = 0; i < n; i++) {
        arr.push(inArr[i])
    }
    let print = ''
    for (i = arr.length-1 ; i >= 0; i--) {
        print += `${arr[i]} `
    }
    console.log(print);
}
reverse(3, [10, 20, 30, 40, 50])
