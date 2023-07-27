import { createEvent } from '../api/data.js';
import { html } from '../lib.js'
import { createSubmitHandler } from '../utils.js';

const createTemplate = (onSubmit) => html`
<section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="name" id="name" placeholder="Event" />
              <input type="text" name="imageUrl" id="event-image" placeholder="Event Image URL" />
              <input type="text" name="category" id="event-category" placeholder="Category" />
              <textarea id="event-description" name="description" placeholder="Description" rows="5" cols="50" ></textarea>
              <input type="text" name="date" id="date" placeholder="When?" />
              <button type="submit">Add</button>
            </form>
          </div>
        </section>`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(ctx, onSubmit)))
    console.log('create')
}

async function onSubmit(ctx, data, e) {
    if (Object.values(data).some(v => v.trim() == '')) {
        return alert('All inputs must be filled!')
    }

    try {
        await createEvent(data)
        e.target.reset()
        ctx.page.redirect('/catalog')
    } catch (error) {
        alert(error.message)
    }
}

