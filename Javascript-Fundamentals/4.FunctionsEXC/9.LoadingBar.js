function solve(n) {
    let [percent,dots] = 
    [(count) => '%'.repeat(count / 10),  //PERCENT
    (count)=> '.'.repeat(10 - (count / 10))]   //DOTS

    if (n < 100) {
        console.log(`${n}% [${percent(n)}${dots(n)}]`);
        console.log('Still loading...');
    } else {
        console.log('100% Complete!');
        console.log(`[${percent(n)}${dots(n)}]`);
    }
}
solve(90)