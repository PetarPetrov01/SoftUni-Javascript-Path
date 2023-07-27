import { html, updateBook } from './api/data.js'

export const updateTemplate = (book) => html`
<form @submit=${(e) => onSubmit(e)} data-id=${book._id} id="edit-form">
    <input type="hidden" name="id">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`

async function onSubmit(e) {
    debugger
    e.preventDefault()
    const formData = new FormData(e.target)

    const title = formData.get('title').trim()
    const author = formData.get('author').trim()

    if (title == '' || author == '') {
        alert('All inputs must be filled!')
        return
    }

    e.target.reset()
    
    await updateBook(e.target.dataset.id, { title, author })

}