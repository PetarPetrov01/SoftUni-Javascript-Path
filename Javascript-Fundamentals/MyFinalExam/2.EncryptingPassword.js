function encryptPass(inArr) {
    let inputs = +inArr.shift()
    let pattern = /(.+)>(?<nums>[0-9]{3})\|(?<lower>[a-z]{3})\|(?<upper>[A-Z]{3})\|(?<symbols>[^<>]{3})<\1/
    //let pattern = /([^\>\<]+)>(?<nums>[0-9]{3})\|(?<lower>[a-z]{3})\|(?<upper>[A-Z]{3})\|(?<symbols>[^\<\>]{3})<\1/

    for (let i = 0; i < inputs; i++) {
        let match = pattern.exec(inArr[i])

        if (match !== null) {
            console.log(`Password: ${match.groups.nums + match.groups.lower + match.groups.upper + match.groups.symbols}`);
        } else {
            console.log('Try another password!');
        }
    }
}
encryptPass((["3",
    "##>00|no|NO|!!!?<###",
    "##>123|yes|YES|!!!<##",
    "$$<111|noo|NOPE|<<>$$"])
)