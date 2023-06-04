function schoolGrading(inputArr) {
    let schoolGrades = new Map()
    for (let row of inputArr) {
        row = row.split(' ')
        let student = row.shift()
        let grades = row.map(Number)
        if (schoolGrades.has(student)) {
            let currentGrades = schoolGrades.get(student)
            for (let grade of grades) {
                currentGrades.push(grade)
                schoolGrades.set(student, currentGrades)
            }
        } else {
            schoolGrades.set(student, grades)
        }

    }
    let sortedArr = Array.from(schoolGrades.entries())
    sortedArr = sortedArr.sort((a, b) => a[0].localeCompare(b[0]))
        .map((student) => {
            let average = student[1].reduce((acc, b) => acc + b, 0) / student[1].length
            student[1] = average
            console.log(`${student[0]}: ${average.toFixed(2)}`);
            return ;
        })  
}
schoolGrading(['Lilly 4 6 6 5',
    'Tim 5 6',
    'Tammy 2 4 3',
    'Tim 6 6']
)