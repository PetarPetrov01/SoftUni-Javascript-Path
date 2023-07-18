import {  render } from './node_modules/lit-html/lit-html.js'
import { contacts } from './contacts.js'
import { contactTemplate} from '/template.js'

const contactsDiv = document.querySelector('#contacts')
render(contacts.map(contactTemplate), contactsDiv)

contactsDiv.addEventListener('click', onClick)
function onClick(e) {
    e.preventDefault()
    if (e.target.tagName != 'BUTTON') {
        return
    }
    const detailsDiv = e.target.parentElement.querySelector('.details')
    if (detailsDiv.style.display == 'block') {
        detailsDiv.style.display = 'none'
    } else {
        detailsDiv.style.display = 'block'
    }
}


