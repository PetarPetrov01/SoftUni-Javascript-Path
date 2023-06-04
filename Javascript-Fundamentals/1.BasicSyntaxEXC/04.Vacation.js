function solve(groupNum, groupType, day) {
    let dayPrice = 0
    let sumPrice = 0
    switch (day) {
        case 'Friday':
            if (groupType === 'Students') {
                dayPrice = 8.45
            } else if (groupType === 'Business') {
                dayPrice = 10.9
            } else if (groupType === 'Regular') {
                dayPrice = 15
            }
            break;
        case 'Saturday':
            if (groupType === 'Students') {
                dayPrice = 9.8
            } else if (groupType === 'Business') {
                dayPrice = 15.6
            } else if (groupType === 'Regular') {
                dayPrice = 20
            }
            break;
        case 'Sunday':
            if (groupType === 'Students') {
                dayPrice = 10.46
            } else if (groupType === 'Business') {
                dayPrice = 16
            } else if (groupType === 'Regular') {
                dayPrice = 22.5
            }
            break;
    }
    if (groupType === 'Students' && groupNum >= 30) {
        sumPrice = 0.85 * (groupNum * dayPrice)
    } else if (groupType === 'Business' && groupNum >= 100) {
        sumPrice = dayPrice * (groupNum - 10)
    } else if (groupType === 'Regular' && groupNum >= 10 && groupNum <= 20) {
        sumPrice = 0.95 * (groupNum * dayPrice)
    } else {
        sumPrice = dayPrice * groupNum
    }
console.log(`Total price: ${sumPrice.toFixed(2)}`);
}
solve(30,"Students","Sunday")
solve(40,"Regular","Saturday")