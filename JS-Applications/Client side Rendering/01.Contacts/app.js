import { html, render } from './node_modules/lit-html/lit-html.js'
import { contacts } from './contacts.js'

const contactTemplate = (contact) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${contact.name}</h2>
        <button class="detailsBtn">Details</button>
        <div class="details" id=${contact.id}>
            <p>Phone number: ${contact.phoneNumber}</p>
            <p>Email: ${contact.email}</p>
        </div>
    </div>
</div>
`
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


