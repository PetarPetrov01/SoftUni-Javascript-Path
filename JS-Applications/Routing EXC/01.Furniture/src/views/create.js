import { createItem } from "../api/data.js"
import { html } from "../lib.js"

const createTemplate = (onSubmit, errors) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Create New Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (errors.make ? ' is-invalid' : '')} id = "new-make" type = "text" name = "make" >
            </div >
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (errors.model ? ' is-invalid' : '')} id="new-model" type="text" name="model">
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (errors.year ? ' is-invalid' : '')} id="new-year" type="number" name="year">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (errors.description ? ' is-invalid' : '')} id="new-description" type="text" name="description">
            </div>
        </div >
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${"form-control" + (errors.price ? ' is-invalid' : '')} id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${"form-control" + (errors.img ? ' is-invalid' : '')} id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
    </div >
</form > `

export function createPage(ctx) {
    update({})

    function update(errors) {
        ctx.render(createTemplate(onSubmit, errors))
    }

    async function onSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.target)

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

            await createItem(dataObj)
            ctx.page.redirect('/')
        } catch (err) {
            update(err.errors || {})
        }
    }
}