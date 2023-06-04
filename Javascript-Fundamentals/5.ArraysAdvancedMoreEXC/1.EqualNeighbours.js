function solve(input) {
    let count = 0

    for (let i = 0; i < input.length; i++) {
        let rowArr = input[i]
        for (j = 0; j < rowArr.length; j++) {
            let currentElement = rowArr[j]

            if (i !== input.length - 1 && currentElement === input[i + 1][j]) { //if not on last row
                count++
            }

            if (j !== rowArr.length - 1 && currentElement === rowArr[j + 1]) { //if not on last element
                    count++   
            }
        }
    }
    console.log(count);
}

solve([['test', 'yo', 'yo', 'ho'],
['well', 'done', 'no', '6'],
['not', 'done', 'yet', '5']]
)