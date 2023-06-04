function spiceMustFlow(startingYield) {
    let yield = startingYield
    let days = 0
    let extractedSpices = 0
    let sum = 0
    while (yield >= 100) {
        days++
        extractedSpices = yield - 26
        if (extractedSpices <= 0){
            extractedSpices = 0
        }
            yield -= 10
        sum += extractedSpices
    }
    sum -= 26
    if (sum <= 0){
        sum = 0
    }
    console.log(days);
    console.log(sum);
}
spiceMustFlow(450)