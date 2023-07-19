const nav = document.querySelector('nav')

export function loadPage(currSection) {

    document.querySelectorAll('.view-section').forEach(e => e.style.display = 'none')
    currSection.style.display = 'block'
}

export function updateNavigation() {
    const user = JSON.parse(localStorage.getItem('user'))
    const msgAnchor = document.querySelector('#welcome-msg')
    if (user != null) {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'block')
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none')
        msgAnchor.textContent = `Welcome, ${user.email}`;
    } else {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none')
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'block')
        msgAnchor.textContent = ''
    }
}