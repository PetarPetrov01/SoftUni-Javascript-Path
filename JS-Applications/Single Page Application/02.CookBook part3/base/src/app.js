import { loadCatalog, showCatalog } from "./catalog.js";
import { loadLogin, showLogin } from "./login.js";
import { loadRegister, showRegister } from "./register.js";
import { loadCreate, showCreate } from "./create.js";
import { loadDetails } from "./details.js";
import { loadEdit } from "./edit.js";

window.addEventListener('load', async () => {
    console.log('laina we')
    const main = document.querySelector('main')

    //Set navigation of the user
    if (sessionStorage.getItem('authToken') != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }

    //Load all sections
    loadRegister(document.querySelector('#register'), updateNavigation)
    loadLogin(document.querySelector('#login'), updateNavigation)
    loadCatalog(document.querySelector('#catalog'), updateNavigation)
    loadDetails(document.querySelector('#details'), updateNavigation)
    loadEdit(document.querySelector('#edit'), updateNavigation)
    loadCreate(document.querySelector('#create'), updateNavigation)


    //Load the page
    showCatalog()


    //Header buttons functionality
    const allLinks = {
        'loginLink': showLogin,
        'registerLink': showRegister,
        'catalogLink': showCatalog,
        'logoutBtn': onLogout,
        'createLink': showCreate
    }
    const nav = document.querySelector('nav')

    nav.addEventListener('click', (e) => {
        if (e.target.tagName == 'A') {
            const func = allLinks[e.target.id]
            if (func) {
                e.preventDefault()
                func()
            }
        }
    })

    function updateNavigation(linkId) {
        Array.from(document.querySelectorAll('nav a')).forEach(a => a.id == linkId ? a.classList.add('active') : a.classList.remove('active'))
    }

});

async function onLogout() {
    debugger
    const response = await fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'X-Authorization': sessionStorage.getItem('authToken')
        },
    });
    if (response.status == 204 ** response.ok) {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('userId');
        window.location.pathname = 'index.html';
    } else {
        console.error(await response.json());
    }
}



