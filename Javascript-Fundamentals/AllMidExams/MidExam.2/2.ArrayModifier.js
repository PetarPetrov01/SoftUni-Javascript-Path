function solve(input) {
    let arr = input.shift().split(' ').map(Number)

    for (el of input) {
        if (el === 'end') {
            break;
        }
        let commanArr = el.split(' ')
        let commmand = commanArr[0]
        let firstIndex = Number(commanArr[1])
        let secondIndex = Number(commanArr[2])
        switch (commmand) {
            case "swap":
                let firstEl = arr.slice(firstIndex, firstIndex + 1)
                let secondEl = arr.slice(secondIndex, secondIndex + 1)
                arr.splice(firstIndex, 1, secondEl[0])
                arr.splice(secondIndex, 1, firstEl[0])
                break;
            case "multiply":
                arr[firstIndex] *= arr[secondIndex]
                break;
            case "decrease":
                arr = arr.map((el) => el -= 1)
                break;
        }
    }
    console.log(arr.join(', '));
}
solve([
    '1 2 3 4',
    'swap 0 1',
    'swap 1 2',
    'swap 2 3',
    'multiply 1 2',
    'decrease',
    'end'
  ]
  
)