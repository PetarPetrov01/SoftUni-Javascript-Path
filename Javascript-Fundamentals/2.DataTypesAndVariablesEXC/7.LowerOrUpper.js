function lowerOrUpper(n) {
    let char = String(n)
    if (char.toUpperCase() === char) {
        console.log(`upper-case`);
    }else {
        console.log(`lower-case`);
    }
}
lowerOrUpper('L')