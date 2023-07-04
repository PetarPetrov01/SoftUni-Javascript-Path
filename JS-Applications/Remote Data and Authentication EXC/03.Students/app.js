window.addEventListener('load', (e) => {
    const form = document.querySelector('#form')
    form.addEventListener('submit', onSubmit)

    loadData()
})

async function loadData() {
    const url = 'http://localhost:3030/jsonstore/collections/students'
    const tBody = document.querySelector('tbody')

    tBody.innerHTML = ''

    try {
        const res = await fetch(url)
        const data = await res.json()

        Object.values(data)
            .forEach((student) => tBody.appendChild(listStudent(student)))

    } catch (err) {
        alert(err.message)
    }
}

async function onSubmit(e) {
    e.preventDefault()

    const url = 'http://localhost:3030/jsonstore/collections/students'

    const form = e.target
    const formData = new FormData(form)

    const firstName = formData.get('firstName').trim()
    const lastName = formData.get('lastName').trim()
    const facultyNumber = formData.get('facultyNumber').trim()
    const grade = formData.get('grade').trim()

    try {
        if (firstName == '' ||
            lastName == '' ||
            facultyNumber == '' ||
            isNaN(facultyNumber) ||
            grade == '' ||
            isNaN(grade)
        ) {
            throw new Error('All inputs have to be filled and facultyNumber and grade must be numbers!')
        }

        const student = { firstName, lastName, facultyNumber, grade }

        const res = await fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        })

        form.reset()
        loadData()
    } catch (err) {
        alert(err.message)
    }

}

function listStudent(student) {
    let trEl = document.createElement('tr')

    trEl.innerHTML = `<td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.facultyNumber}</td>
        <td>${student.grade}</td>`

    return trEl
}