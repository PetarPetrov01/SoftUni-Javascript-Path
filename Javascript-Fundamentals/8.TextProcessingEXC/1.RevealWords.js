function revealWords(str, template) {
    let arr = str.split(', ')
    let templateArr = template.split(' ')
    for (let el of arr) {
        for (let i = 0; i < templateArr.length; i++) {

            if (templateArr[i] === '*'.repeat(el.length)) {
                templateArr[i] = el
            }
        }
    }
    console.log(templateArr.join(' '));

}
revealWords('great, learning',
'softuni is ***** place for ******** new programming languages'

)