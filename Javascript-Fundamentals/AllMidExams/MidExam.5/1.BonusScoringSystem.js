function solve(input) {
    let students = Number(input.shift())
    let lectures = Number(input.shift())
    let initialBonus = Number(input.shift())

    let bonus = 0
    let maxBonus = 0
    let mostLectures = 0

    for (i = 0; i < students; i++) {
        let lecturesAttended = +input[i]
        bonus = lecturesAttended / lectures * (5 + initialBonus)
        
        if (bonus > maxBonus) {
            maxBonus = bonus
            mostLectures = lecturesAttended
        }
    }
    console.log(`Max Bonus: ${Math.ceil(maxBonus)}.`);
    console.log(`The student has attended ${Math.ceil(mostLectures)} lectures.`);
}   
solve([
    '10', '30', '14', '8',
    '23', '27', '28', '15',
    '17', '25', '26', '5',
    '18'
  ]
  
)