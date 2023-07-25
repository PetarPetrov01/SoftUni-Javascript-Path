import { createBook, html, render } from "./api/data.js";

export const createFormTemplate = () => html`
<form @submit=${(e) => onSubmit(e)} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`

async function onSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    if (title == '' || author == '') {
        alert('All inputs must be filled!')
        return
    }

    e.target.reset()
    await createBook({ title, author })

}

let context;

export function setupCreate(ctx) {
    context = ctx
}
