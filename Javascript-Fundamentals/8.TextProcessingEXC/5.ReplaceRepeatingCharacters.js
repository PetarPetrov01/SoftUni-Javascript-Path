function replaceRepeating(input) {
    let output = ''
    for (char of input) {
        if (char !== output[output.length - 1]) {
            output += char
        }
    }
    console.log(output);
}
replaceRepeating('aaaaabbbbbcdddeeeedssaa')

function repl(input) {
    let output = ''
    for (let i = 0; i < input.length; i++) {
        let char = input[i]
        if (char === input[i + 1]) {
            continue;
        } else {
            output += char
        }
    }
    console.log(output);
}
repl('aaaaabbbbbcdddeeeedssaa')