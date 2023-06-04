function modernTimes(input) {
    let flag = false
    let arr = input.split(' ')
    for (let word of arr) {
        if (word.startsWith('#') && word.length > 1) {
            for (let i = 0; i < word.length; i++) {
                let capsWord = word.toUpperCase().substring(1)
                if (capsWord.charCodeAt(i) < 65 || capsWord.charCodeAt(i) > 90) {
                    flag = true
                    break;
                }
            }
            if(!flag){
                console.log(word.substring(1));
            }
        }
        flag = false
    }
}
modernTimes('Nowadays everyone uses # to tag a #special word in #socialMedia #sdawd2S #sda')