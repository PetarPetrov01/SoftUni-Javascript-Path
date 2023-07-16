export function initiliaze(links) {
    const main = document.querySelector('main');
    document.querySelector('nav').addEventListener('click', onNavigate)

    const context = {
        showSection,
        goTo,
        updateNav
    }

    return context

    function showSection(section) {
        main.replaceChildren(section)
    }

    function onNavigate(e) {
        let target = e.target
        if (target.tagName == 'IMG') {
            target = e.target.parentElement
        }

        if (target.tagName == 'A') {
            e.preventDefault()
            const url = new URL(target.href)
            goTo(url.pathname)
        }
    }

    function goTo(name, ...params) {
        const handler = links[name]
        if (typeof handler == 'function') {
            handler(context, ...params)
        }
    }

    function updateNav() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            document.querySelectorAll('.user').forEach(a => a.style.display = 'block')
            document.querySelectorAll('.guest').forEach(a => a.style.display = 'none')
        } else {
            document.querySelectorAll('.user').forEach(a => a.style.display = 'none')
            document.querySelectorAll('.guest').forEach(a => a.style.display = 'block')
        }
    }
}

