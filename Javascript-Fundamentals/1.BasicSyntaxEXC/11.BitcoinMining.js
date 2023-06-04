function bitcoin(input) {
    let gold = 0
    let money = 0
    let bitcoin = 0
    let btcSum = 0
    let day = 0
    let firstBought = 0
    let btcBought = 0
    for (i = 0; i < input.length; i++) {
        gold = Number(input[i])
        day++
        if (day % 3 === 0) {
            gold *= 0.7
        }
        money += gold * 67.51;

        if (money >= 11949.16) {
            btcBought++
            bitcoin = Math.floor(money / 11949.16)
            money = money - (bitcoin * 11949.16)
            btcSum += bitcoin
            if (btcBought === 1) {
                firstBought = day
            }
        }
    }
    console.log(`Bought bitcoins: ${btcSum.toFixed(0)}`);
    if (firstBought != 0) {
        console.log(`Day of the first purchased bitcoin: ${firstBought}`);
    }
    console.log(`Left money: ${money.toFixed(2)} lv.`);
}
bitcoin([3124.15, 504.212, 2511.124])