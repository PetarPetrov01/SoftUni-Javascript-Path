export function showYearly(year) {
    const selYear = document.querySelector(`section#year-${year}`)
    Array.from(document.querySelectorAll('section'))
        .forEach(s => s.style.display = 'none')

    selYear.style.display = ''
    return selYear
}