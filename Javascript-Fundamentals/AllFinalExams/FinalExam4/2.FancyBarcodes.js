function fancyBarCode(input) {
    let pattern = /@#+(?<word>[A-Z][A-Za-z0-9]{4,}[A-Z])@#+/
    let barcodesNum = Number(input.shift())

    for (let i = 0; i < barcodesNum; i++) {
        let valid = pattern.exec(input[i])
        let word = ''
        if (valid !== null) {
            word = valid.groups.word
        } else {
            console.log('Invalid barcode')
            continue;
        }
        let nums = word.match(/\d/g)
        if (!nums) {
            console.log(`Product group: 00`);
        } else {
            console.log(`Product group: ${nums.join('')}`);
        }

    }
}
fancyBarCode(["6",
"@###Val1d1teM@###",
"@#ValidIteM@#",
"##InvaliDiteM##",
"@InvalidIteM@",
"@#Invalid_IteM@#",
"@#ValiditeM@#"])
