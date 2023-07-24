import { html, render } from "./node_modules/lit-html/lit-html.js"
import { getTable } from './api.js'

const rowTemplate = (student) => html`
<tr class=${student.match ? 'select' : ''}>
      <td>${student.firstName} ${student.lastName}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
</tr>`

function update(students) {
   render(students.map(rowTemplate), document.querySelector('tbody'))
}


const students = Object
   .values(await getTable())
   .map(s => {
      s['match'] = false
      return s
   })

update(students)

const searchBar = document.querySelector('#searchField')
document.querySelector('#searchBtn').addEventListener('click', onClick);
function onClick() {
   const match = searchBar.value.trim().toLowerCase()
   students.forEach(s => {
      let fullName = s.firstName + ' ' + s.lastName
      if (match && (fullName.toLowerCase().includes(match) ||
         s.email.toLowerCase().includes(match) ||
         s.course.toLowerCase().includes(match))
      ) {
         s.match = true
      } else {
         s.match = false
      }
   })
   console.log(students)
   searchBar.value = ''
   update(students)
}
