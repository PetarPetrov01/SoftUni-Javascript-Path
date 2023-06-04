function censor(text, word) {
    let stars = '*'.repeat(word.length)
    while (text.includes(word)) {
        text = text.replace(word, stars)
    }
    console.log(text);
}
censor('A small sentence with some words', 'small')