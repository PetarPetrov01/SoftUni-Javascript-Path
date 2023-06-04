function maxOfEqual(arr) {
    let longest = []

    for (i = 0; i < arr.length; i++) {
        let currentElement = Number(arr[i])
        let currentSequnce = [currentElement]

        for (j = i + 1; j < arr.length; j++) {
            let nextElement = arr[j]

            if (currentElement === nextElement) {
                currentSequnce.push(nextElement)
            } else {
                break;
            }
        }

        if (currentSequnce.length > longest.length) {
            longest = []
            for (k = 0; k < currentSequnce.length; k++) {
                longest.push(currentSequnce[k])
            }

        }
    }
    console.log(longest.join(' '));
}
maxOfEqual([2, 1, 1, 2, 3, 3, 2, 2, 2, 1])