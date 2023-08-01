import { editItem, getById } from "../api/data.js"
import { html, until } from "../lib.js"

const editTemplate = (itemPromise, onSubmit) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        ${until(itemPromise, html`<p>Loading &hellip;</p>`)}
    </div>
</form>`

const itemTemplate = (item, errors) => html`
<div class="col-md-4">
    <div class="form-group">
        <label class="form-control-label" for="new-make">Make</label>
        <input class=${"form-control" + (errors.make ? ' is-invalid' : '')} id="new-make" type="text" name="make" .value=${item.make}>
    </div>
    <div class="form-group has-success">
        <label class="form-control-label" for="new-model">Model</label>
        <input class=${"form-control" + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model" .value=${item.model}>
    </div>
    <div class="form-group has-danger">
        <label class="form-control-label" for="new-year">Year</label>
        <input class=${"form-control" + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year" .value=${item.year}>
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-description">Description</label>
        <input class=${"form-control" + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description" .value=${item.description}>
    </div>
</div>
<div class="col-md-4">
    <div class="form-group">
        <label class="form-control-label" for="new-price">Price</label>
        <input class=${"form-control" + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price" .value=${item.price}>
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-image">Image</label>
        <input class=${"form-control" + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img" .value=${item.img}>
    </div>
    <div class="form-group">
        <label class="form-control-label" for="new-material">Material (optional)</label>
        <input class="form-control" id="new-material" type="text" name="material" .value=${item.material}>
    </div>
    <input type="submit" class="btn btn-info" value="Edit" />
</div>`

export function editPage(ctx) {
    const id = ctx.params.id
    update({})
    function update(errors) {
        ctx.render(editTemplate(loadItem(id, errors), onSubmit))
    }

    async function onSubmit(ev) {
        ev.preventDefault()

        const formData = new FormData(ev.target)

        const dataArr = [...formData.entries()]
        const dataObj = Object.fromEntries(dataArr)

        dataObj.year = Number(dataObj.year)
        dataObj.price = Number(dataObj.price)
        try {
            const errors = {
                make: dataObj.make.length < 4,
                model: dataObj.model.length < 4,
                year: dataObj.year > 2050 || dataObj.year < 1950,
                description: dataObj.description.length <= 10,
                price: dataObj.price <= 0,
                img: dataObj.img == ''
            }

            let invalid = Object.keys(errors).filter(k => errors[k] == true)
            if (invalid.length > 0) {
                throw {
                    error: new Error(`Invalid inputs: ${invalid.join(', ')} `),
                    errors: errors
                }
            }

            await editItem(id, dataObj)
            ctx.page.redirect('/')
        } catch (err) {
            update(err.errors || {})
        }
    }
}

async function loadItem(id, errors) {
    const item = await getById(id)

    return itemTemplate(item, errors)
}