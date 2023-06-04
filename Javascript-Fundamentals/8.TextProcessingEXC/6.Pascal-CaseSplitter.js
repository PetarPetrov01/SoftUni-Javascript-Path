function pascalSplitter(input) {
    let output = []
    let prevIndex = 0
    for (let i = 0; i < input.length; i++) {
        if (i === input.length - 1) {
            output.push(input.substring(prevIndex));
            break;  
        }
        if (input[i + 1].charCodeAt(0) >= 65 && input[i + 1].charCodeAt(0) <= 90) {
            output.push(input.substring(prevIndex, i + 1));
            prevIndex = i + 1
        }
    }
    console.log(output.join(', '));
}
pascalSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan')