function solve(input) {
    input = input.map((el) => Number(el) * 1000)

    for (i = 1; i <= 30; i++) {
        input[0] -= 300
        if (i % 2 == 0) {
            input[1] -= input[0] * 0.05
        }
        if (i % 3 == 0) {
            input[2] -= (1 / 3) * input[3]
        }
        
    }
    if (input[0] <= 0 || input[1] <= 0 || input[2] <= 0) {
         console.log('Merry must go to the pet store!');   
    } else {
    console.log(`Everything is fine! Puppy is happy! Food: ${(input[0] / 1000).toFixed(2)}, Hay: ${(input[1] / 1000).toFixed(2)}, Cover: ${(input[2] / 1000).toFixed(2)}.`);
    console.log();
    }
}
solve(["9",
"5",
"5.2",
"1"])


