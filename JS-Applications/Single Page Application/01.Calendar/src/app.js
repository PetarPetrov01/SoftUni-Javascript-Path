import { showMonthly } from "./monthly.js"
import { showYearly } from "./yearly.js"

const sections = Array.from(document.querySelectorAll('section'))
sections.forEach(s => s.style.display = 'none')

const years = document.querySelector('#years')
years.style.display = ''

years.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target.tagName != 'DIV') {
        return
    }

    const selectedYear = e.target.textContent
    const yearEl = showYearly(selectedYear)

    yearEl.addEventListener('click', (e) => {
        e.preventDefault()

        if (e.target.tagName != 'DIV') {
            return
        }

        const selectedMonth = e.target.textContent
        showMonthly(selectedYear, selectedMonth)
    })
})

