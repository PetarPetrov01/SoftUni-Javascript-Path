window.addEventListener("load", solve);

function solve() {
    const gemNameElement = document.querySelector('#gem-name')
    const colorElement = document.querySelector('#color')
    const caratsElement = document.querySelector('#carats')
    const priceElement = document.querySelector('#price')
    const typeElement = document.querySelector('#type')

    const addBtn = document.querySelector('#add-btn')

    const previewList = document.querySelector('#preview-list')
    const collectionList = document.querySelector('#collection')


    addBtn.addEventListener('click', onAdd)
    function onAdd(e) {
        e.preventDefault()

        if (gemNameElement.value == '' ||
            colorElement.value == '' ||
            caratsElement.value == '' ||
            priceElement.value == '' ||
            typeElement.value == ''
        ) {
            return
        }

        //create the element
        let liElement = document.createElement('li')
        liElement.setAttribute('class', 'gem-info')

        let articleElement = document.createElement('article')

        let headElement = document.createElement('h4')
        headElement.textContent = gemNameElement.value

        let colorParagraph = document.createElement('p')
        colorParagraph.textContent = `Color: ${colorElement.value}`

        let caratsParagraph = document.createElement('p')
        caratsParagraph.textContent = `Carats: ${caratsElement.value}`

        let priceParagraph = document.createElement('p')
        priceParagraph.textContent = `Price: ${priceElement.value}$`

        let typeParagraph = document.createElement('p')
        typeParagraph.textContent = `Type: ${typeElement.value}`

        articleElement.appendChild(headElement)
        articleElement.appendChild(colorParagraph)
        articleElement.appendChild(caratsParagraph)
        articleElement.appendChild(priceParagraph)
        articleElement.appendChild(typeParagraph)

        let saveBtn = document.createElement('button')
        saveBtn.className = 'save-btn'
        saveBtn.textContent = 'Save To Collection'

        let editBtn = document.createElement('button')
        editBtn.className = 'edit-btn'
        editBtn.textContent = 'Edit Information'

        let cancelBtn = document.createElement('button')
        cancelBtn.className = 'cancel-btn'
        cancelBtn.textContent = 'Cancel'

        liElement.appendChild(articleElement)
        liElement.appendChild(saveBtn)
        liElement.appendChild(editBtn)
        liElement.appendChild(cancelBtn)

        previewList.appendChild(liElement)

        //disable button
        addBtn.disabled = true

        //variables for values
        let gemName = gemNameElement.value
        let color = colorElement.value
        let carats = caratsElement.value
        let price = priceElement.value
        let type = typeElement.value

        //clear inputs
        gemNameElement.value = ''
        colorElement.value = ''
        caratsElement.value = ''
        priceElement.value = ''
        typeElement.value = ''

        editBtn.addEventListener('click', onEdit)
        function onEdit(e) {
            e.preventDefault()

            gemNameElement.value = gemName
            colorElement.value = color
            caratsElement.value = carats
            priceElement.value = price
            typeElement.value = type

            //Enable the button again
            addBtn.disabled = false

            liElement.remove()
        }

        saveBtn.addEventListener('click', onSave)
        function onSave(e) {
            e.preventDefault()

            let liElementColl = document.createElement('li')

            let collectionParagraph = document.createElement('p')
            collectionParagraph.className = 'collection-item'
            collectionParagraph.textContent = `${gemName} - Color: ${color}/ Carats: ${carats}/ Price: ${price}$/ Type: ${type}`

            liElementColl.appendChild(collectionParagraph)
            collectionList.appendChild(liElementColl)

            liElement.remove()
            addBtn.disabled = false
        }

        cancelBtn.addEventListener('click', onCancel)

        function onCancel(e) {
            e.preventDefault()
            addBtn.disabled = false
            liElement.remove()
        }
    }
}
