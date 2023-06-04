function build(inArr) {    /*  100/100 */
    inArr.map(Number)
    let dailyVolume = 0
    let printArr = []
    let volumeArr = []
    let totalVolume = 0
    let price = 0

    let sumOfArray = inArr.reduce((acc, el) => acc + el, 0)
    while (sumOfArray !== inArr.length * 30) {

        printArr = inArr.map((el) => {
            if (el < 30) {
                dailyVolume += 195
                return el + 1
            } else {
                return 30
            }
        })

        volumeArr.push(dailyVolume)
        dailyVolume = 0
        inArr = printArr.slice()
        sumOfArray = printArr.reduce((acc, el) => acc + el, 0)
    }
    console.log(volumeArr.join(', '))
    totalVolume = volumeArr.reduce((acc, el) => acc + el, 0)
    price = totalVolume*1900
    console.log(price+' pesos');
}
build([17,
    22,
    17,
    19,
    17])

    function solve(arr) {    /*  50/100 LOOP PROBLEM*/
        arr.map(Number)
        let dailyVolume = 0
        let totalPrice = 0
        let printArr = []
        while (arr.length > 0) {
    
            for (el of arr) {
                if (el < 30) {
                    dailyVolume += 195
                    arr.splice(arr.indexOf(el), 1, el + 1)
                }
                if (el === 30) {
                    arr.splice(arr.indexOf(el), 1)
                }
    
            }
            if (dailyVolume > 0) {
                printArr.push(dailyVolume)
                totalPrice += dailyVolume * 1900
            }
            dailyVolume = 0
        }
        console.log(printArr.join(', '));
        console.log(totalPrice + ' pesos');
    }
    // solve([17,
    //     22,
    //     17,
    //     19,
    //     17])
