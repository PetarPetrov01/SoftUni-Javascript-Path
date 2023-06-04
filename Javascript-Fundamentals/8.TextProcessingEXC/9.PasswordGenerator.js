function passwordGen(arr) {
    let word = arr.pop().split('').map((el)=>el.toUpperCase())
    let replaceArr = word.slice()
    let fullArr = arr.join('').split('')
    let finalArr = []

    for (let i = 0; i < fullArr.length; i++) {

        let ch = fullArr[i]
        switch (ch) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':

                if (replaceArr.length <= 0) {
                    replaceArr = word.slice()
                }
                finalArr.push(replaceArr.shift())
                break;
            default:
                finalArr.push(fullArr[i])
                break;
        }
    }
    console.log(`Your generated password is ${finalArr.reverse().join('')}`);
}
passwordGen([
    'easymoneyeazylife', 'atleasttencharacters', 'absolute'
    ]
    
)