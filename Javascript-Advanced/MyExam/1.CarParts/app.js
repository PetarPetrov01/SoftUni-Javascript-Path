window.addEventListener('load', solve);

function solve() {
        const carModelElement = document.querySelector('#car-model')
        const carYearElement = document.querySelector('#car-year')
        const partNameElement = document.querySelector('#part-name')
        const partNumberElement = document.querySelector('#part-number')
        const conditionElement = document.querySelector('#condition')

        const nextBtn = document.querySelector('#next-btn')

        const previewList = document.querySelector('.info-list')
        const confirmList = document.querySelector('.confirm-list')

        const completeImg = document.querySelector('#complete-img')
        const completeText = document.querySelector('#complete-text')

        nextBtn.addEventListener('click', onNext)
        function onNext(e) {
                e.preventDefault()

                //Valide input
                if (
                        carModelElement.value == '' ||
                        carYearElement.value == '' ||
                        partNameElement.value == '' ||
                        partNumberElement.value == '' ||
                        conditionElement.value == '' ||
                        carYearElement.value < 1980 ||
                        carYearElement.value > 2023
                ) {
                        return
                }

                //create the li elemnt
                let liElement = document.createElement('li')
                liElement.className = 'part-content'

                let articleEl = document.createElement('article')

                let modelParagraph = document.createElement('p')
                modelParagraph.textContent = `Car Model: ${carModelElement.value}`

                let yearParagraph = document.createElement('p')
                yearParagraph.textContent = `Car Year: ${carYearElement.value}`

                let nameParagraph = document.createElement('p')
                nameParagraph.textContent = `Part Name: ${partNameElement.value}`

                let numberParagraph = document.createElement('p')
                numberParagraph.textContent = `Part Number: ${partNumberElement.value}`

                let conditionParagraph = document.createElement('p')
                conditionParagraph.textContent = `Condition: ${conditionElement.value}`

                articleEl.appendChild(modelParagraph)
                articleEl.appendChild(yearParagraph)
                articleEl.appendChild(nameParagraph)
                articleEl.appendChild(numberParagraph)
                articleEl.appendChild(conditionParagraph)

                const editBtn = document.createElement('button')
                editBtn.className = 'edit-btn'
                editBtn.textContent = 'Edit'


                const continueBtn = document.createElement('button')
                continueBtn.className = 'continue-btn'
                continueBtn.textContent = 'Continue'

                liElement.appendChild(articleEl)
                liElement.appendChild(editBtn)
                liElement.appendChild(continueBtn)

                previewList.appendChild(liElement)

                //get variables for the values
                let carModel = carModelElement.value
                let carYear = carYearElement.value
                let partName = partNameElement.value
                let partNumber = partNumberElement.value
                let condition = conditionElement.value

                //clear inputs
                carModelElement.value = ''
                carYearElement.value = ''
                partNameElement.value = ''
                partNumberElement.value = ''
                conditionElement.value = ''

                //disavle button and picture
                nextBtn.disabled = true
                completeImg.style.visibility = 'hidden'
                completeText.textContent = ''


                //Buttons functionality
                editBtn.addEventListener('click', onEdit)
                function onEdit(e) {
                        e.preventDefault()

                        carModelElement.value = carModel
                        carYearElement.value = carYear
                        partNameElement.value = partName
                        partNumberElement.value = partNumber
                        conditionElement.value = condition

                        nextBtn.disabled = false

                        liElement.remove()
                }

                continueBtn.addEventListener('click', onContinue)
                function onContinue(e) {
                        e.preventDefault()

                        let liConfirmElement = document.createElement('li')
                        liConfirmElement.className = 'part-content'

                        let confirmArticle = document.createElement('article')
                        confirmArticle = articleEl

                        const confirmBtn = document.createElement('button')
                        confirmBtn.className = 'confirm-btn'
                        confirmBtn.textContent = 'Confirm'

                        const cancelBtn = document.createElement('button')
                        cancelBtn.className = 'cancel-btn'
                        cancelBtn.textContent = 'Cancel'

                        liConfirmElement.appendChild(confirmArticle)
                        liConfirmElement.appendChild(confirmBtn)
                        liConfirmElement.appendChild(cancelBtn)

                        confirmList.appendChild(liConfirmElement)
                        previewList.removeChild(liElement)

                        confirmBtn.addEventListener('click', onConfirm)
                        function onConfirm(e) {
                                e.preventDefault()

                                completeImg.style.visibility = 'visible'
                                completeText.textContent = 'Part is Ordered!'

                                nextBtn.disabled = false
                                liConfirmElement.remove()
                        }

                        cancelBtn.addEventListener('click', onCancel)
                        function onCancel(e) {
                                e.preventDefault()
                                nextBtn.disabled = false
                                liConfirmElement.remove()
                        }
                }

        }
        console.log(carModelElement, carYearElement, partNameElement, partNumberElement, conditionElement, nextBtn, previewList, confirmList)
};




