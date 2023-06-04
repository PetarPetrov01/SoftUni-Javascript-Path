function miner(input) {
    let miner = {}
    let amount = 0
    for (let i = 0; i < input.length; i += 2) {
        if(miner.hasOwnProperty(input[i])){
            amount = miner[input[i]] + Number(input[i+1])
            miner[input[i]] = amount
        } else {
            miner[input[i]] = Number(input[i+1])
        }
        
    }
    for (let metal in miner) {
        console.log(`${metal} -> ${miner[metal]}`);
    }
}
miner([
    'gold',
    '155',
    'silver',
    '10',
    'copper',
    '17',
    'gold',
    '15'
]

)