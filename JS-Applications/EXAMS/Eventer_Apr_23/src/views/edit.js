import { editEvent, getById } from '../api/data.js';
import { html, until } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const editTemplate = (eventPromise, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onSubmit} class="edit-form">
                ${until(eventPromise, html`<p>loading</p>`)}
            </form>
          </div>
        </section>`;

const editFormTemplate = (event) => html`
<input type="text" name="name" id="name" placeholder="Event" .value=${event.name} />
<input type="text" name="imageUrl" id="event-image" placeholder="Event Image" .value=${event.imageUrl} />
<input type="text" name="category" id="event-category" placeholder="Category" .value=${event.category} />
<textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50" .value=${event.description}></textarea>
<label for="date-and-time">Event Time:</label>
<input type="text" name="date" id="date" placeholder="When?" .value=${event.date} />
<button type="submit">Edit</button>`

export function editPage(ctx) {
    ctx.render(editTemplate(loadEvent(ctx), createSubmitHandler(ctx, onSubmit)))
    console.log('edit')
}

async function loadEvent(ctx) {
    const eventId = ctx.params.id

    const event = await getById(eventId)
    return editFormTemplate(event)
}

async function onSubmit(ctx, data, e) {
    const editId = ctx.params.id
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await editEvent(editId, data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}