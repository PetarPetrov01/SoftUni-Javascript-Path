function equalSums(arr) {
    let result = 'no'

    for (i = 0; i <= arr.length - 1; i++) {
        let leftSum = 0
        let rightSum = 0
        for (j = 0; j < i; j++) {
            leftSum += arr[j]
        }

        for (k = arr.length - 1; k > i; k--) {
            rightSum += arr[k]

        }
        if (rightSum === leftSum) {
            result = i
            break;
        }
    }
    console.log(result);
}
equalSums([1,2,3,2,1])