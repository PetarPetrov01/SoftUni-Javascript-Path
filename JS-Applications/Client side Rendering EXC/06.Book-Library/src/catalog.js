import { deleteBook, getAllBooks, html, updateBook } from "./api/data.js"
import { createFormTemplate } from "./create.js";
import { updateTemplate } from "./update.js";

const wholeTemplate = (books, edit, book) => html`
<button @click=${(e) => onLoad(e)} id="loadBooks">LOAD ALL BOOKS</button>
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${books != undefined ? books.map(rowTemplate) : ''}
    </tbody>
</table>
${edit ? updateTemplate(book) : createFormTemplate()}`

const rowTemplate = (book) => html`
    <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button @click=${onEdit} data-id=${book._id}>Edit</button>
            <button @click=${onDelete} data-id=${book._id}>Delete</button>
        </td>
    </tr >`
let books;
let context;

async function onLoad(e) {
    e.preventDefault()
    books = Object.entries(await getAllBooks()).map(([k, v]) => Object.assign(v, { _id: k }))
    context.update(wholeTemplate(books, false))
}

export function setupCatalog(ctx) {
    context = ctx
}

export function loadWholePage() {
    return context.update(wholeTemplate())
}

function onEdit(e) {
    e.preventDefault()
    const book = books.find(b => b._id == e.target.dataset.id)
    console.log(book)
    context.update(wholeTemplate(books, true, book))
}

function onDelete(e) {
    e.preventDefault()
    const confirmDelete = confirm('Are you sure you want to delete this book?')
    if (confirmDelete) {
        deleteBook(e.target.dataset.id)
    }
}