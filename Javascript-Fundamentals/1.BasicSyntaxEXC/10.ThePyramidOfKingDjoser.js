function pyramid(b, inc) {
    let marble = 0
    let stone = 0
    let lapiz = 0
    let gold = 0
    let step = 0
    let height = 0
    for (i = b; i >= 1; i -= 2) {
        height++
        step++
        if (i <= 2) {
            gold = (i * i) * inc
        } else {
            stone += ((i - 2) * (i - 2)) * inc
            if (step >= 5) {   
                lapiz += (Math.pow(i, 2) - Math.pow((i - 2), 2)) * inc
                step = 0
            } else {
                marble += (Math.pow(i, 2) - Math.pow((i - 2), 2)) * inc
            }
        }
    }
    console.log(`Stone required: ${Math.ceil(stone)}`);
    console.log(`Marble required: ${Math.ceil(marble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapiz)}`);
    console.log(`Gold required: ${Math.ceil(gold)}`);
    console.log(`Final pyramid height: ${Math.floor(height*inc)}`);
}
pyramid(11, 0.75)