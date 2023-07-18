import { createIdea } from "../api/data.js";

const section = document.querySelector('#createPage');
const form = section.querySelector('form')
form.addEventListener('submit', onSubmit)

let ctx;
export function showCreate(context) {
    ctx = context
    context.showSection(section)
}

async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(form)

    const title = formData.get('title').trim()
    const description = formData.get('description').trim()
    const img = formData.get('imageURL').trim()

    if (title == '' ||
        description == '' ||
        img == ''
    ) {
        return alert('All inputs must be filled!')
    }

    await createIdea({title, description, img})
    form.reset()
    ctx.goto('/catalog')
}